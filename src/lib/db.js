import PocketBase from 'pocketbase';
const pbstudent = new PocketBase('http://127.0.0.1:8090');
pbstudent.autoCancellation(false);
export default pbstudent;