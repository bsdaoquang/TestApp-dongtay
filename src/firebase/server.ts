import { db } from './config';

// type of conditions
type Condition = {
  field: string;
  op: '==' | '!=' | '>' | '<' | 'array-contains';
  value: any;
};

// type of Query
type Query = {
  collection: string;
  conditions?: Condition[];
  limit?: number;
};

const createDoc = async (collection: string, data: any) => {
  const ref = db.collection(collection);
  const docRef = await ref.add(data);
  const doc = await docRef.get();
  return { id: doc.id, ...doc.data() };
};

const readDocs = async ({ collection, conditions = [], limit }: Query) => {
  let query: any = db.collection(collection);
  for (const cond of conditions) {
    query = query.where(cond.field, cond.op, cond.value);
  }

  // Get total items without limit
  const totalSnapshot = await query.get();
  const totalItems = totalSnapshot.size;

  // Apply limit if provided
  if (limit) query = query.limit(limit);
  const snapshot = await query.get();
  const items = snapshot.docs.map((doc: any) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return { items, totalItems };
};

const updateDoc = async (
  collection: string,
  docId: string,
  data: Partial<any>,
) => {
  const ref = db.collection(collection).doc(docId);
  await ref.update(data);
  const updated = await ref.get();
  return { id: updated.id, ...updated.data() };
};
const deleteDoc = async (collection: string, docId: string) => {
  await db.collection(collection).doc(docId).delete();
  return { success: true, id: docId };
};

export { deleteDoc, updateDoc, createDoc, readDocs };
