require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Studychinese
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

    # デフォルトのロケールを:en以外に変更する
    config.i18n.default_locale = :ja

    # I18nライブラリに訳文の探索場所を指示する
    # config.i18n.load_path += Dir[Rails.root.join('config/locales/*.yml').to_s]

    # デプロイするサービスのホストを追加する
    # config.hosts << 'https://studychinese.onrender.com'
  end
end
