import {firestore} from "firebase-admin/lib/firestore";

export async function getNestedDocument(ref: firestore.DocumentReference | undefined){
    try {
        const documentSnapshot = await ref.get()
        return  {
            id: documentSnapshot.id,
            ...documentSnapshot.data()
        }
    }
    catch (e){
        return ref
    }
}
export async function getNestedArray(refs: firestore.DocumentReference[] | undefined){
    return refs ?
        await Promise.all(refs?.map(async ref => {
            try {
                const documentSnapshot = await ref.get()
                return  {
                    id: documentSnapshot.id,
                    ...documentSnapshot.data()
                }
            }
            catch (e){
                return ref
            }
        })) : []
}
