import message from "./message.js";
import messages from "./messages.js";

console.log(message); // hello message!1
console.log(messages);
// hello Default!2 => message, messages에서 호출되는 name 모듈은 각각 다른 스코프에서 동작한다.
