export function handleUserMessage(message) {
    console.log(message);
    message = message.toLowerCase();
    
    if (message.includes('password')) {
      return 'To reset your password, Please jump into profile page there be a tab to rest your password!';
    } else if (message.includes('contact admin')) {
      return 'You can contact the admin at chat page on admins pannels';
    } else if (message.includes('tour')) {
      return 'To find tours, chocice from the navbar tours you can find all the tours';
    } else {
      return 'I am not sure how to help you with that.';
    }
}