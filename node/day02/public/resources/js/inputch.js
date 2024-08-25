window.onload = function () {
  var submit = document.getElementById("form");
  submit.addEventListener("submit", function (e) {
    var formData = new FormData(submit);
    var entries = formData.entries();

    for (var entry of entries) {
      var key = entry[0];
      var value = entry[1];
      if (!value) {
        let item = document.getElementsByName(key);
        alert(key + "를(을) 입력해주세요");
        e.preventDefault();
        item[0].focus();
        return;
      }
    }
  });
};
