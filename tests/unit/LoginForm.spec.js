import LoginForm from "@/components/LoginForm";
import { mount } from "@vue/test-utils";

describe("LoginForm", () => {
  it("Emits an event with user data payload", () => {
    const wrapper = mount(LoginForm);
    //   1 find user input
    const inputEl = wrapper.find('[data-testid="name-input"]');
    // 2 set input value
    inputEl.setValue("Waseem Ahmed");
    // 3 trigger submit button
    wrapper.trigger("submit");
    //  4 check event emiited
    const emittedEvent = wrapper.emitted("formSubmitted");
    expect(emittedEvent).toHaveLength(1);
    //  check the payload
    const payload = { name: "Waseem Ahmed" };
    expect(emittedEvent[0][0]).toMatchObject(payload);
  });
});
