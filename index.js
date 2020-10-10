/**
 * @file
 * @date 2020/10/09
 * @author hpuhouzhiqiang@didiglobal.com
 */
const lodash = require('lodash');
const encodeDevinfo = require('./lib/aes');
const devGitInfo = require('./lib/git').developGitInfo;
const HtmlWebpackPlugin = require('html-webpack-plugin');

class HtmlDevInfoWebpackPlugin {
  apply(compiler) {
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

              metaData.push(
                this.metaTagString('devinfo', await this.devInfoString())
              );
              lodash.set(data, 'assetTags.meta', metaData);

              cb(null, data);
            }
          );
        }
      );
    } else {
      // webpack v2
      compiler.plugin('compilation', (compilation) => {
        compilation.plugin('html-webpack-plugin-alter-asset-tags', function (htmlPluginData, callback) {
          const htmlHeadData = htmlPluginData.head || [];

          htmlHeadData.push(this.metaTagString('devinfo', await this.devInfoString()));
          lodash.set(htmlPluginData, 'head', htmlHeadData);

          callback(null, htmlPluginData);
        });
      });
    }
  }

  metaTagString(_name, _content) {
    return {
      tagName: 'meta',
      voidTag: true,
      attributes: {
        _name,
        _content
      }
    };
  }

  async devInfoString() {
    const devInfo = await devGitInfo();
    return encodeDevinfo.encodeCrypto(JSON.stringify(devInfo));
  }
}

module.exports = HtmlDevInfoWebpackPlugin;
