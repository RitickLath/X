export default class AuthRepository {
  async signup() {
    try {
      // Make database call
      console.log("hi");
      return;
    } catch (error) {
      console.log("Error From Auth Repository");
      throw new Error("Repository: Failed to make DB Call");
    }
  }

  async signin() {
    try {
      // Make database call
    } catch (error) {
      console.log("Error From Auth Repository");
      throw new Error("Repository: Failed to make DB Call");
    }
  }

  async update() {
    try {
      // Make database call
    } catch (error) {
      console.log("Error From Auth Repository");
      throw new Error("Repository: Failed to make DB Call");
    }
  }

  async forget() {
    try {
      // Make database call
    } catch (error) {
      console.log("Error From Auth Repository");
      throw new Error("Repository: Failed to make DB Call");
    }
  }
}
