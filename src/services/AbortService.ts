export const Req_Keys = {
  DisabilityGetTotals: "GetTotals",
  DisabilityGetNeighborhoodTotals: "GetNeighborhoodTotals",
  ActivitiesGetAll: "ActivitiesGetAll",
  ActivitiesGetSixMonths: "ActivitiesGetSixMonths",
  VacancyCreate: "VacancyCreate",
  VacancyGet: "VacancyGet",
};

class AbortService {
  controllers = new Map();

  controlReq(stringKey: string, controller: AbortController) {
    if (this.controllers.has(stringKey)) {
      this.controllers.get(stringKey)?.abort();
    }

    this.controllers.set(stringKey, controller);
  }

  deleteReq(stringKey: string) {
    this.controllers.delete(stringKey);
  }
}

export default new AbortService();
