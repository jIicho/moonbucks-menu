// step1 요구사항 구현을 위한 전략

// TODO 메뉴 추가
// - [x] 메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다.
// - [x] 메뉴의 이름을 입력 받고 확인 버튼을 클릭하면 메뉴를 추가한다.
// - [x] 추가되는 메뉴의 아래 마크업은 <ul id="espresso-menu-list" class="mt-3 pl-0"></ul> 안에 삽입해야 한다.
// - [x] 총 메뉴 갯수를 count하여 상단에 보여준다.
// - [x] 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
// - [x] 사용자 입력값이 빈 값이라면 추가되지 않는다.

const $ = (selector) => document.querySelector(selector);

function App() {
  // TODO 메뉴 수정
  // - [ ] 메뉴의 수정 버튼클릭 이벤트를 받고, 메뉴를 수정하는 모달창이 뜬다.(브라우저에서 제공하는 prompt 인터페이스를 활용)
  // - [ ] 모달창에서 신규 메뉴명을 입력 받고, 확인 버튼을 누르면 메뉴가 수정된다.

  $("#espresso-menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      // console.log(e.target);
      const $menuName = e.target.closest("li").querySelector(".menu-name");
      // const menuName = $menuName.innerText;
      // 굳이 변수에 담지않고 바로 불러오게끔 해도 될 것 같다.
      const updatedMenuName = prompt(
        "메뉴명을 수정하세요",
        $menuName.innerText
      );
      $menuName.innerText = updatedMenuName;
    }
  });

  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  const addMenuName = () => {
    if ($("#espresso-menu-name").value === "") {
      alert("값을 입력해주세요.");

      return;
    }
    const espressoMenuName = $("#espresso-menu-name").value;

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

    // console.log(menuItemTemplate(espressoMenuName));

    $("#espresso-menu-list").insertAdjacentHTML(
      "beforeend",
      menuItemTemplate(espressoMenuName)
    );

    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;

    $(".menu-count").innerText = `총 ${menuCount} 개`;

    $("#espresso-menu-name").value = "";
  };

  // 확인 버튼을 클릭하면 메뉴를 추가하는 기능을 구현해보자.
  $("#espresso-menu-submit-button").addEventListener("click", () => {
    // 밑에있는 코드를 붙여야하는데 코드가 중복이 될 때는 어떻게 해야할까?
    // 재사용 할 수 있는 함수를 만들어보자
    addMenuName();
  });

  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      return;
    }
    addMenuName();
  });
}

App();

// TODO 메뉴 삭제
// - [ ] 메뉴 살제 버튼 클릭 이벤트를 받고, 메뉴 삭제 컨펌 모달창이 뜬다. (브라우저에서 제공하는 confirm 인터페이스를 활용)
// - [ ] 확인 버튼을 클릭하면 메뉴가 삭제된다.
// - [ ] 총 메뉴 갯수를 count하여 상단에 보여준다.
