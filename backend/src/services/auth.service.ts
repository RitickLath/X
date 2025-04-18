import AuthRepository from "../repository/auth.repository";

export default class AuthService {
  public authRepository = new AuthRepository();

  async signupService() {
    try {
      // write the business logic
      console.log("Hello");
      return this.authRepository.signup();
    } catch (error) {
      console.log("Error From Auth Service");
      throw new Error("Service: Error From Service Layer");
    }
  }

  async signinService() {
    try {
      // write the business logic
      return this.authRepository.signin();
    } catch (error) {
      console.log("Error From Auth Service");
      throw new Error("Service: Error From Service Layer");
    }
  }

  async updateService() {
    try {
      // write the business logic
      return this.authRepository.update();
    } catch (error) {
      console.log("Error From Auth Service");
      throw new Error("Service: Error From Service Layer");
    }
  }

  async forgetService() {
    try {
      // write the business logic
      return this.authRepository.forget();
    } catch (error) {
      console.log("Error From Auth Service");
      throw new Error("Service: Error From Service Layer");
    }
  }
}
