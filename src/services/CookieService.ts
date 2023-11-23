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

  removeCookie(cookieName: string) {
    Cookies.remove(cookieName);
  }
}

export default new CookieService();
