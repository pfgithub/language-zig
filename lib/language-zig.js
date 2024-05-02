const { AutoLanguageClient } = require("atom-languageclient");

class ZigLanguageClient extends AutoLanguageClient {
  getGrammarScopes() {
    return ["source.zig"];
  }
  getLanguageName() {
    return "Zig";
  }
  getServerName() {
    return "zls";
  }

  startServerProcess(projectPath) {
    const zlsPath = atom.config.get("language-zig-zls.zls");
    if (!zlsPath) {
      atom.notifications.addError("zls path is not set", {
        detail:
          "set config item language-zig-zls.zls to the /path/to/zls executable. reload once ready.",
        dismissable: true
      });
      return;
    }
    return super.spawn(zlsPath, [], { cwd: projectPath });
  }
}

module.exports = new ZigLanguageClient();
module.exports.config = {
  zls: {
    type: "string",
    default: "zls",
    title: "zls path",
    description: "Window: Reload after changing this setting."
  }
};
