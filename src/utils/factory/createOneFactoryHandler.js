
export default async (model, data = {}) => {

    const doc = await model.create({ ...data })
    return doc

}