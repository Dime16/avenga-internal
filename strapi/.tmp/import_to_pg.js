const fs = require('fs');
const axios = require('axios');

const BASE_URL = 'http://localhost:1337/api';
const TOKEN = 'e597c64f4f523541c938e57c62792a915843e6b6fd85ce7a804b189a154dd8302ec0b1c4f5d3c226c889e20f15dc64a062013c944de31f582ac5a2251fc58518f99e6ca3bfe041b126b414ce3c8280addd25cebec8392eb0fc736c5d9e19b353ba11008d57f49ed812eed1d8d7e12af17a38680eb846a8a7407b3578f0248c41'; // Generate this from Strapi Admin → Settings → API Tokens

const collections = [
'abouts', 'admin_permissions', 'admin_permissions_role_lnk', 'admin_roles',
'admin_users', 'admin_users_roles_lnk', 'bible_study_cards',
'components_footer_footer_menu_items', 'components_footer_footer_menu_items_cmps', 'components_footer_menu_items',
'featured_bible_studies', 'files', 'files_foldes_lnk', 'files_related_mph', 'footer_menus', 'footers', 'footers_cmps',
"i18n_locale",
  "image_cards",
  "interactive_bible_studies",
  "menu_items",
  "stickers",
  "strapi_api_token_permissions",
  "strapi_api_token_permissions_token_lnk",
  "strapi_api_tokens",
  "strapi_core_store_settings",
  "strapi_database_schema",
  "strapi_history_versions",
  "strapi_migrations",
  "strapi_migrations_internal",
  "strapi_release_actions",
  "strapi_release_actions_release_lnk",
  "strapi_releases",
  "strapi_transfer_token_permissions",
  "strapi_transfer_token_permissions_token_lnk",
  "strapi_transfer_tokens",
  "strapi_webhooks",
    "strapi_workflows",
    "strapi_workflows_stage_required_to_publish_lnk",
    "strapi_workflows_stages",
    "strapi_workflows_stages_permissions_lnk",
    "strapi_workflows_stages_workflow_lnk",
    "up_permissions",
    "up_permissions_role_lnk",
    "up_roles",
    "up_users",
    "up_users_role_lnk",
    "upload_folders",
    "upload_folders_parent_lnk",
    "user_daily_logins",
    "user_daily_logins_user_lnk",
    "win_your_world_videos"

]; // Adjust as needed based on your exported files

async function importData() {
  for (const collection of collections) {
    const records = JSON.parse(fs.readFileSync(`./sqlite_exports/${collection}.json`));

    for (const item of records) {
      const data = item; // adjust here if your JSON format needs mapping

      try {
        await axios.post(`${BASE_URL}/${collection}`, { data }, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        });
        console.log(`✅ Imported item into ${collection}`);
      } catch (err) {
        console.error(`❌ Failed to import into ${collection}:`, err.response?.data || err.message);
      }
    }
  }
}

importData();