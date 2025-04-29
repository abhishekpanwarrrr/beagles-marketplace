// api/products.ts
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export async function getProducts() {
  const productsRef = collection(db, 'products');
  const snapshot = await getDocs(productsRef);

  const products = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return products;
}
export async function getProductById(id: string) {
  const productsRef = collection(db, 'products');
  const snapshot = await getDocs(productsRef);
  const product = snapshot.docs
    .map((doc) => ({
      docId: doc.id,
      ...doc.data(),
    }))
    .find((product) => String(product?.id) === id);

  return product;
}

// export const uploadProducts = async () => {
//   try {
//     const productsCollection = collection(db, 'products');

//     // Upload each product individually
//     for (const product of products) {
//       await addDoc(productsCollection, product);
//     }

//     console.log('Products uploaded successfully!');
//   } catch (error) {
//     console.error('Error uploading products:', error);
//   }
// };
