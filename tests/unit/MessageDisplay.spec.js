import MessageDisplay from "@/components/MessageDisplay";
import { mount } from "@vue/test-utils";
import { getMessage } from "@/services/axios.js";
import flushPromises from "flush-promises";

jest.mock("@/services/axios.js");

beforeEach(() => {
  jest.clearAllMocks();
});
describe("MessageDisplay", () => {
  test("calls getMessage and displays message", async () => {
    const mockMessage = "Hello from the db!";
    getMessage.mockResolvedValueOnce({ text: mockMessage });
    const wrapper = mount(MessageDisplay);
    await flushPromises();
    expect(getMessage).toHaveBeenCalledTimes(1);

    const message = wrapper.find('[data-testid="message"]').element.textContent;
    console.log("message", message);
    expect(message).toEqual(mockMessage);
  });
  test("Displays an error when getMessage call fails", async () => {
    const mockError = "Oops! Something went wrong.";
    getMessage.mockRejectedValueOnce(mockError);
    const wrapper = mount(MessageDisplay);

    await flushPromises();
    expect(getMessage).toHaveBeenCalledTimes(1);
    const displayedError = wrapper.find('[data-testid="message-error"]').element
      .textContent;
    expect(displayedError).toEqual(mockError);
  });
});
