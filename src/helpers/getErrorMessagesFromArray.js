
export default (errorMessagesObject = {}) => {

    const messages = []

    errorMessagesObject.forEach(obj => {
        messages.push(obj.msg)
    });

    return messages

}