declare module "*.vue" {
  global {
    const APP_ENV: string
    const APP_MODE: 'development' | 'production'
  }
  import Vue from "vue";
  export default Vue;
}
