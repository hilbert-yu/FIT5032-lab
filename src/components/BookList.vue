<!-- <template>
    <div>
    <h1>Books with ISBN > 1000</h1>
    <ul>
        <li v-for="book in books" :key="book.id">
        {{ book.name }} - ISBN: {{ book.isbn }}
        </li>
    </ul>
    </div>
</template>
  
<script>
import { ref, onMounted } from 'vue';
import db from '../firebase/init.js';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default {
  setup() {
    const books = ref([]);

    const fetchBooks = async () => {
      try {
        const q = query(collection(db, 'books'), where('isbn', '>', 1000));
        const querySnapshot = await getDocs(q);
        const booksArray = [];
        querySnapshot.forEach((doc) => {
          booksArray.push({ id: doc.id, ...doc.data() });
        });
        books.value = booksArray;
      } catch (error) {
        console.error('Error fetching books: ', error);
      }
    };

    onMounted(() => {
      fetchBooks();
    });

    return {
      books
    };
  }
};
</script> -->


<template>
    <div>
      <h1>Books with ISBN from 1000 to 5000, which are listed in ascending order by name and then ascending order by isbn.
        with limitation of a maximum of 5 books are displayed
      </h1>
      <ul>
        <li v-for="book in books" :key="book.id">
          <div>
            <span>{{ book.name }} - ISBN: {{ book.isbn }}</span>
            <button @click="editBook(book)">Edit</button>
            <button @click="deleteBook(book.id)">Delete</button>
          </div>
        </li>
      </ul>
  
      <div v-if="isEditing">
        <h2>Edit Book</h2>
        <form @submit.prevent="updateBook">
          <div>
            <label for="isbn">ISBN:</label>
            <input type="text" v-model="isbn" id="isbn" required />
          </div>
          <div>
            <label for="name">Name:</label>
            <input type="text" v-model="name" id="name" required />
          </div>
          <button type="submit">Update Book</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import db from '../firebase/init.js';
  import { collection, query, where, orderBy, limit, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
  
  export default {
    setup() {
      const books = ref([]);
      const isbn = ref('');
      const name = ref('');
      const isEditing = ref(false);
      const currentBookId = ref(null);
  
      const fetchBooks = async () => {
        try {
            //   const q = query(collection(db, 'books'), where('isbn', '>', 1000));
            const q = query(
                collection(db, 'books'),
                where('isbn', '>=', 1000),
                where('isbn', '<=', 5000),
                orderBy('name', 'asc'),
                orderBy('isbn', 'asc'),
                limit(5)
            );

            const querySnapshot = await getDocs(q);
            const booksArray = [];
            querySnapshot.forEach((doc) => {
                booksArray.push({ id: doc.id, ...doc.data() });
            });
            books.value = booksArray;
        } catch (error) {
            console.error('Error fetching books: ', error);
        }
      };
  
      const editBook = (book) => {
        isbn.value = book.isbn;
        name.value = book.name;
        currentBookId.value = book.id;
        isEditing.value = true;
      };
  
      const updateBook = async () => {
        try {
          const bookRef = doc(db, 'books', currentBookId.value);
          await updateDoc(bookRef, {
            isbn: Number(isbn.value),
            name: name.value
          });
          alert('Book updated successfully!');
          isEditing.value = false;
          isbn.value = '';
          name.value = '';
          fetchBooks();
        } catch (error) {
          console.error('Error updating book: ', error);
        }
      };
  
      const deleteBook = async (id) => {
        try {
          const bookRef = doc(db, 'books', id);
          await deleteDoc(bookRef);
          alert('Book deleted successfully!');
          fetchBooks();
        } catch (error) {
          console.error('Error deleting book: ', error);
        }
      };
  
      onMounted(() => {
        fetchBooks();
      });
  
      return {
        books,
        isbn,
        name,
        isEditing,
        editBook,
        updateBook,
        deleteBook
      };
    }
  };
  </script>
  