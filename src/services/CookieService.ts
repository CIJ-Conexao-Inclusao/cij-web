import Cookies from "js-cookie";

class CookieService {
  /** Retorna user logado ou null */
  getUser() {
    let cookie;
    try {
      cookie = JSON.parse(Cookies.get("user") || "");
    } catch (error) {
      cookie = "";
    }
    return cookie;
  }
}

export default new CookieService();
