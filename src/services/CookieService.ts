import Cookies from "js-cookie";

class CookieService {
  /** Retorna user logado ou null */
  getCookie(cookieName: string) {
    let cookie;
    try {
      cookie = Cookies.get(cookieName);
    } catch (error) {
      cookie = "";
    }
    return cookie;
  }
}

export default new CookieService();
