/**
 * A very simple way of sending messages to a connect conversation. all you need is the sys_id from the live group profile
 */


var conversation = sn_connect.Conversation.get("INSERT SYS_ID FROM LIVE GROUP Profile");
conversation.sendMessage("The Message you want to send");