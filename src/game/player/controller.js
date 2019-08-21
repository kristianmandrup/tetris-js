const createController = game => {
  /* moves player piece if valid */
  return {
    rotate: require("./rotate")(game),
    move: require("./move")(game),
    createNew: require("./new")(game)
  };
};
