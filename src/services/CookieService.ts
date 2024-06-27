import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { ROLES } from "../constants/ROLES";

export interface ITokenInfo {
	exp: number;
	email: number;
	role: ROLES;
}

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

	getRole(): ROLES | null {
		const token = Cookies.get("token");
		if (token) {
			const info: ITokenInfo = jwtDecode(token);

			return info.role;
		}
		return null;
	}
}

export default new CookieService();
