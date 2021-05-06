<script>
	import InputSearch from "./components/inputSearch/inputSearch.svelte"
	import CardList from "./components/listCard/listCard.svelte"
	import Modal from "./components/modal/modal.svelte"
	import firebase from "firebase/app";
	import firebaseConfig from "./config/setting"
	import {onMount} from "svelte"
    import 'firebase/firestore';
    import 'firebase/performance';
    import 'firebase/database';

	let eventList = []
	let isShowModal = true
	let curentEvent = ""
	let filterWorld = ""
	let filterName = ""
	let congratulationsList = []
	let chooseCongratulation = []
	let filters = []

	firebase.initializeApp(firebaseConfig)

	const unique = (arr) => {
		let result = [];
		for (let str of arr) {
			if (!result.includes(str)) {
			result.push(str);
			}
		}
		return result;
	}
	onMount(() => {
		firebase.database().ref("Event").on("value", (snapshot) => {
		let list = []
		let filterList = []
		snapshot.forEach(eventBlocks => {
			filterList = filterList.concat(Object.keys(eventBlocks.val()))
			eventBlocks.forEach(e => {
				list = list.concat(Object.entries(e.val()))
			})
		})
		filters = unique(filterList)
		chooseCongratulation = congratulationsList =	list
		eventList = Object.keys(snapshot.val())
		})
	})
	
	
	const changeVisibleModal = (chooseEvent) => {
		isShowModal = false
		filterName = ""
		curentEvent = chooseEvent.detail
		if(chooseEvent.detail){
			let curentFilter = []
			chooseEvent = chooseEvent.detail
			firebase.database().ref(`Event/${chooseEvent}`).on("value", (snapshot) => {
				snapshot.forEach(eventBlocks => {
					
					curentFilter = curentFilter.concat(Object.entries(eventBlocks.val()))
					console.log(curentFilter)
				})
			})
			chooseCongratulation = congratulationsList = curentFilter
		}
	}

	const showModal = () => {
		isShowModal = true;
	}
	const chooseFilter = (filter) => {	
		let list = []
		filterName = filter
		if(curentEvent === null){
			firebase.database().ref("Event").on("value", (snapshot) => {
				snapshot.forEach(eventBlocks => {
					eventBlocks.forEach((el) => {
						if(Object.keys(el.val())[0].split("-")[0] === filter){
							console.log(el.val())
							list = list.concat(Object.entries(el.val()))
						}
					})
				})
			})
		}else{
			firebase.database().ref(`Event/${curentEvent}`).on("value", (snapshot) => {
				snapshot.forEach(eventBlocks => {
					if(Object.keys(eventBlocks.val())[0].split("-")[0] === filter){
						list = list.concat(Object.entries(eventBlocks.val()))
					}
				})
			})
		}
		console.log(list)
		chooseCongratulation = congratulationsList = list
	}
	const findGreet = (greetWord) => {
		filterWorld = greetWord.detail
		console.log(filterWorld)
		let chooseCongratulationList = []
		congratulationsList.forEach((greet) => {
			console.log(greet[1])
			if(greet[1].includes(filterWorld)){
				chooseCongratulationList.push(greet)
			}
		})
		console.log(chooseCongratulationList)
		chooseCongratulation =  chooseCongratulationList	
	}
</script>

<main>
	<h1>Welcome to the greetiList</h1>
    <div on:click={showModal}>
		{#if curentEvent}
			<h2>{curentEvent}</h2>
		{/if}	
        <h3>change event</h3>
    </div>
	<InputSearch on:input = {findGreet} />
	{#each filters as filter}
		<button on:click={chooseFilter(filter)} class={filter === filterName?'curentFilterButton': 'filterButton'}>{filter}</button>
	{/each}
		<CardList bind:chooseCongratulation />
	{#if isShowModal}
		<Modal on:change = {changeVisibleModal} bind:eventList />
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
	.filterButton{
		border:1px solid black;
		border-radius: 10px;
		margin: 15px;
		background: white;
	}
	.curentFilterButton {
		border:1px solid black;
		border-radius: 10px;
		margin: 15px;
		background: gray;
	}
	.filterButton:hover{
		transition: 1s;
		background: gray;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>