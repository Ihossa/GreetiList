<script>
import { createEventDispatcher, each } from "svelte/internal";

    export let eventList = [];

    let dispatch = createEventDispatcher()
    
    let changeVisibleModal = (e) => {
        e.stopImmediatePropagation()
        console.dir(e.target.classList[0])
        switch(e.target.classList[0]) {
            case 'btn': dispatch('change', e.target.textContent); break;
            case 'close': dispatch('change'); break;
            case 'wrap': dispatch('change'); break;
        }
    }

</script>

<style>
    .wrap{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.514);
    }
    .modal{
        position: absolute;
        margin: auto;
        border-radius: 10px;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 70%;
        height: 70%;
        background: white;
    }
    .close {
        position: absolute;
        right: 20px;
        font-size: 40px;
        font-weight: 800;
        cursor: pointer;
    } 

    .btn {
        border:1px solid black;
		border-radius: 10px;
		margin: 15px;
		background: white;
    }
    .btn:hover{
		transition: 1s;
		background: gray;
	}
</style>

<div on:click={changeVisibleModal} class="wrap">
    <div class="modal">
        <span class="close">X</span>
        <h1>С каким праздником вы хотите поздравить</h1>
        {#each eventList as event}
            <button class = 'btn'>{event}</button>
        {/each}        
    </div>
</div>