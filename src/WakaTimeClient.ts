import axios, { AxiosInstance } from "axios";
import Range from "./Range";

class WakaTimeClient {
  private client: AxiosInstance;

  /**
   * Construct a new instance of the client
   * @param apiKey API Key from https://wakatime.com/settings/api-key
   */
  constructor(apiKey: string) {
    this.client = axios.create({
      baseURL: "https://wakatime.com/api/v1",
      headers: {
        Authorization: `Basic ${btoa(apiKey)}`,
      },
    });
  }

  private verifyIdentifier = (identifier?: string | number) =>
    identifier ? identifier.toString() : "current";

  private getUser(identifier?: string) {
    identifier = this.verifyIdentifier(identifier);
    return this.client
      .get(`/users/${identifier}`)
      .then((response) => response.data);
  }

  /**
   * Get the currently authorized user
   * @returns {Object}
   */
  getCurrentUser() {
    return this.getUser();
  }

  /**
   * Get a user based on their ID
   * @param id
   * @returns {Object}
   */
  getUserByID(id: string | number) {
    id = id.toString();
    return this.getUser(id);
  }

  /**
   * Get a users stats
   * @param identifier The users ID - leave blank for current user
   */
  getStats(identifier?: string | number) {
    identifier = this.verifyIdentifier(identifier);
    this.client.get(`/users/${identifier}/stats/`);
  }
}

export default WakaTimeClient;
export { Range };