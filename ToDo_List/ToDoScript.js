new Vue({
  el: '#app',
  data: () => {
    return {
      entry: '',
      entryFavorite: false,
      todoList: [],
      completedToDoList: [],
      showCompletedList: false
    }
  },
  methods: {
    addItem() {
      if(this.entry !== '') {
        let date = new Date;
        let newEntry = {
          id: date.getTime(),
          title: this.entry,
          favorite: this.entryFavorite,
          complete: false,
          show: false
        }

        if(newEntry.favorite) {
          this.todoList.splice(0, 0, newEntry);
        }
        else {
          this.todoList.push(newEntry);
        }

        setTimeout(() => {
          this.todoList.find(element => element.id === newEntry.id).show = true;
        }, 10);
      }

      this.entry = '';
      this.entryFavorite = false;
    },
    setFavoriteItem(item) {
      item.favorite = !item.favorite;
      item.show = false;

      setTimeout(() => {
        let index = this.todoList.findIndex(element => element.id === item.id);
        this.todoList.splice(index, 1);
        this.todoList.splice(0, 0, item);
        item.show = true;
      }, 500);
    },
    completeItem(item) {
      item.complete = !item.complete;
      item.show = false;

      setTimeout(() => {
        this.completedToDoList.push(item);
        let index = this.todoList.findIndex(element => element.id === item.id);
        this.todoList.splice(index, 1);
        item.show = true;
      }, 500);
    },
    uncompleteItem(item) {
      item.complete = !item.complete;
      item.show = false;

      setTimeout(() => {
        if(item.favorite) {
          this.todoList.splice(0, 0, item);
        }
        else {
          this.todoList.push(item);
        }

        let index = this.completedToDoList.findIndex(element => element.id === item.id);
        this.completedToDoList.splice(index, 1);
        item.show = true;
      }, 500);
    } 
  }
})