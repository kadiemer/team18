export { addSceneEventListeners };

function addSceneEventListeners (that) {
  that.input.keyboard.on(
    "keydown_ONE",
      function () {
        that.scene.start('WorldScene1');
        }
  );
  that.input.keyboard.on(
    "keydown_ESC",
      function () {
        that.scene.start('WorldScene1');
      }
  );
}
