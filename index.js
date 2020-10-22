/**
 * @file 获取html-webpack-plugin 插件声明周期并且添加自己的开发者信息
 * @date 2020/10/09
 * @author hpuhouzhiqiang@gmail.com
 */
const lodash = require('lodash');
const encodeDevinfo = require('./lib/aes');
const devGitInfo = require('./lib/git').developGitInfo;
const moduleID = require('./lib/module');
const HtmlWebpackPlugin = require('html-webpack-plugin');

class HtmlDevInfoWebpackPlugin {
  apply(compiler) {
    const _this = this;
    // webpack > 2
    if (compiler.hooks) {
      compiler.hooks.compilation.tap(
        'html-devinfo-webpack-plugin',
        compilation => {
          const htmlWebpackPluHooks = HtmlWebpackPlugin.getHooks(compilation);
          const htmlPlugins = compilation.options.plugins.filter(
            plugin => plugin instanceof HtmlWebpackPlugin
          );

          if (htmlPlugins.length === 0) {
            const message =
              "Error running html-devinfo-webpack-plugin, are you sure you have html-webpack-plugin before it in your webpack config's plugins?";
            throw new Error(message);
          }

          htmlWebpackPluHooks.alterAssetTags.tapAsync(
            'html-devinfo-webpack-plugin',
            async (data, cb) => {
              const metaData = data.assetTags.meta;

              const devInfo = await _this.devInfoString();
              // const moduleInfo = await _this.moduleInfo().module_id;

              metaData.push(this.metaTagString('devinfo', devInfo));
              // metaData.push(this.metaTagString('moduleID', moduleInfo));
              lodash.set(data, 'assetTags.meta', metaData);

              cb(null, data);
            }
          );
        }
      );
    } else {
      // webpack v2
      compiler.plugin('compilation', compilation => {
        compilation.plugin(
          'html-webpack-plugin-alter-asset-tags',
          async function (htmlPluginData, callback) {
            const htmlHeadData = htmlPluginData.head || [];
            const devInfo = await _this.devInfoString();
            // const moduleInfo = await _this.moduleInfo().module_id;

            htmlHeadData.push(_this.metaTagString('devinfo', devInfo));
            // htmlHeadData.push(_this.metaTagString('moduleID', moduleInfo));
            lodash.set(htmlPluginData, 'head', htmlHeadData);

            callback(null, htmlPluginData);
          }
        );
      });
    }
  }

  metaTagString(name, content) {
    return {
      tagName: 'meta',
      attributes: {
        name,
        content
      }
    };
  }

  // async moduleInfo() {
  //   return await moduleID.moduleNameToModuleId().data;
  // }

  async devInfoString() {
    const devInfo = await devGitInfo();

    return encodeDevinfo.encodeCrypto(JSON.stringify(devInfo));
  }
}

module.exports = HtmlDevInfoWebpackPlugin;
