import Cookies from "js-cookie";

class CookieService {
  /** Retorna user logado ou null */
  getUser() {
    const cookie = JSON.parse(Cookies.get("user") || "");
    return cookie;
  }
}

export default new CookieService();
