import firebase from "firebase/app";
import firebaseConfig from "./../config/setting";
import 'firebase/firestore';
import 'firebase/performance';
import 'firebase/database';

firebase.initializeApp(firebaseConfig)


let GetALLEvent = async() => {
    await firebase.database().ref("Event").on("value", (snapshot) => {
		let list = []
		let filterList = []
		snapshot.forEach(eventBlocks => {
			filterList = filterList.concat(Object.keys(eventBlocks.val()))
			eventBlocks.forEach(e => {
				list = list.concat(Object.entries(e.val()))
			})
		})
	  return {list, filterList}
	})
}
console.log(GetALLEvent)
export default GetALLEvent