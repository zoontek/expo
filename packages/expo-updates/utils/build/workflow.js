"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveWorkflowAsync = resolveWorkflowAsync;
exports.validateWorkflow = validateWorkflow;
const config_plugins_1 = require("expo/config-plugins");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const vcs_1 = __importDefault(require("./vcs"));
async function resolveWorkflowAsync(projectDir, platform) {
    const vcsClient = await (0, vcs_1.default)(projectDir);
    let platformWorkflowMarkers;
    try {
        platformWorkflowMarkers =
            platform === 'android'
                ? [
                    path_1.default.join(projectDir, 'android/app/build.gradle'),
                    await config_plugins_1.AndroidConfig.Paths.getAndroidManifestAsync(projectDir),
                ]
                : [config_plugins_1.IOSConfig.Paths.getPBXProjectPath(projectDir)];
    }
    catch {
        return 'managed';
    }
    const vcsRootPath = path_1.default.normalize(await vcsClient.getRootPathAsync());
    for (const marker of platformWorkflowMarkers) {
        if (fs_1.default.existsSync(marker) &&
            !(await vcsClient.isFileIgnoredAsync(path_1.default.relative(vcsRootPath, marker)))) {
            return 'generic';
        }
    }
    return 'managed';
}
function validateWorkflow(possibleWorkflow) {
    if (possibleWorkflow === 'managed' || possibleWorkflow === 'generic') {
        return possibleWorkflow;
    }
    throw new Error(`Invalid workflow: ${possibleWorkflow}. Must be either 'managed' or 'generic'`);
}
