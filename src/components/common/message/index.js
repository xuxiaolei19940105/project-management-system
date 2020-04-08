function message(msg, title) {
    this.$message({
        type: msg,
        message: title
    });
}
export default message;
