// step1 요구사항 구현을 위한 전략

// TODO 메뉴 추가
// - [x] 메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다.
// - [ ] 추가되는 메뉴의 아래 마크업은 <ul id="espresso-menu-list" class="mt-3 pl-0"></ul> 안에 삽입해야 한다.
// - [ ] 총 메뉴 갯수를 count하여 상단에 보여준다.
// - [ ] 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
// - [ ] 사용자 입력값이 빈 값이라면 추가되지 않는다.

// 'document.querySelector()' 부분이 자꾸 코드를 길게하는 것 같아 유틸같은 함수를 만들자.
const $ = (selector) => document.querySelector(selector);
// $ 표시는 보통 자바스크립트에서의 돔 엘리먼트,
// HTML 엘리먼트를 가져올 때 $ 표시를 관용적으로 많이 사용한다.
// $ 를 이용해서 selector 에 들어가는 id값을 받아 document.querySelector(selector) 를 리턴해주는 형태로 만들어서 재사용하자.
// 코드가 너무 길어지는 것 같으면, 똑같은 내용이 반복되는 것 같다면
// 그때그때마다 줄여서 쓸 수 있는 방법은 없을지 고민해보면 코드가 훨씬 더 깔끔해질 수 있다.

function App() {
  // 엔터를 쳤을 떄 새로고침 되는 것을 막기위해
  // 즉, form 태그가 자동으로 전송되는 것을 막아주는 것
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  // 메뉴의 이름을 입력받기
  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      // 엔터키를 쳤을때, espressoMenuName 에 value가 가져오는 값을 변수에 담아서 활용해보자.
      const espressoMenuName = $("#espresso-menu-name").value;

      // 요구사항 두번째로 가자.
      // 추가되는 메뉴의 마크업이 무엇인지 READNE.md로 가서 보자!
      // 추가되는 메뉴의 마크업 부분을 복사해서 가져오자.
      // 이 템플릿을 담아놓는 변수를 선언해 담아주자.
      // 이 템플릿은 사용자가 입력한 espressoMenuName의 값을 받아와주고,
      // li 태그안의 name을 넣어 새로운 espressoMenuName이 들어간 태그를 만들어줘야하기 때문에 함수로 선언해주자.
      //  함수를 선언하고, espressoMenuName 변수를 인자로 받아서 그 받은것(인자)을 li태그 안에 넣을 수 있게 만들어보자.
      // 그러면 menuItemTemplate이 함수를 실행을 하면
      // 사용자가 입력한 값을 넣어서 템플릿을 만들어준다.

      const menuItemTemplate = (espressoMenuName) => {
        return `
        <li class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
          >
            수정
          </button>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
          >
            삭제
          </button>
        </li>`;
      };
      // 템플릿이 잘만들어지는지 확인하기 위한 코드
      console.log(menuItemTemplate(espressoMenuName));

      // 잘 작동되는지 확인한 후, 요구사항 두번째의 뒷부분!
      // <ul id="espresso-menu-list" class="mt-3 pl-0"></ul> 안에 삽입해야 하는 부분을 해보자.
      // espresso-menu-list에 만들어진 템플릿을 넣어보자
      // 템플릿이 html코드인데, html 코드를 넣을때는 innerHTML 속성을 이용해 넣을 수 있다.
      // 그 안에 리턴된 템플릿을 넣어준다.
      // $("#espresso-menu-list").innerHTML = menuItemTemplate(espressoMenuName);

      // 첫번째 메뉴이름을 작성하고 다른메뉴를 추가하면 기존의 메뉴가 삭제되서 나타난다.
      // 왜????
      // innerHTML 속성을 사용하면 매번 새롭게 만드는 HTML을 계속 덮어씌우기때문에!!!
      // 기존의 것이 유지되면서 추가되는 것으로 만들어야한다.

      // 이때 사용하는 메소드가 insertAdjacentHTML()

      // <!-- beforebegin -->
      // <ul>
      // <!-- afterbegin -->    여기에 넣으면 새로 추가한 메뉴가 위에 나타난다.
      // <li></li>
      // <!-- beforeend -->     여기에 넣으면 새로 추가한 메뉴가 밑에 나타난다.
      // </ul>
      // <!-- afterend -->

      // 어느 부분에 들어가야할지 생각해보자

      $("#espresso-menu-list").insertAdjacentHTML(
        "beforeend",
        menuItemTemplate(espressoMenuName)
      );
    }
  });
}

App();

// TODO 메뉴 수정
// - [ ] 메뉴의 수정 버튼클릭 이벤트를 받고, 메뉴를 수정하는 모달창이 뜬다.(브라우저에서 제공하는 prompt 인터페이스를 활용)
// - [ ] 모달창에서 신규 메뉴명을 입력 받고, 확인 버튼을 누르면 메뉴가 수정된다.

// TODO 메뉴 삭제
// - [ ] 메뉴 살제 버튼 클릭 이벤트를 받고, 메뉴 삭제 컨펌 모달창이 뜬다. (브라우저에서 제공하는 confirm 인터페이스를 활용)
// - [ ] 확인 버튼을 클릭하면 메뉴가 삭제된다.
// - [ ] 총 메뉴 갯수를 count하여 상단에 보여준다.
