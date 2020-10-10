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
            (data, cb) => {
              const metaData = data.assetTags.meta;

              _this.devInfoString().then(resp => {
                metaData.push(this.metaTagString('devinfo', resp));
                lodash.set(data, 'assetTags.meta', metaData);

                cb(null, data);
              });
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

            _this.devInfoString().then(resp => {
              htmlHeadData.push(
                this.metaTagString('devinfo', resp)
              );
              lodash.set(htmlPluginData, 'head', htmlHeadData);

              callback(null, htmlPluginData);
            })
          }
        );
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
