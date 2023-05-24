import { useNavigate, useParams } from "react-router-dom"
import Header from "../components/Header"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import api from "../api/api"
import urls from "../api/urls"
import actionTypes from "../redux/actions/acitonTypes"

const Editcategory = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { categoryId } = useParams()
    const { categoriesState } = useSelector(state => state)
    const myCategory = categoriesState.categories.find(
        (item) => item.id === categoryId
    )
    const [form, setForm] = useState(myCategory)

    const handleSubmit = (event) => {
        event.preventDefault()
        if (form.name === "") {
            alert("Kategori adı boş bırakılamaz...")
            return
        }
        const hasCategory = categoriesState.categories.find(item => item.name.toLocaleLowerCase() === form.name.toLocaleLowerCase())
        if (hasCategory !== undefined) {
            alert("Böyle bir kategori zaten mevcut")
            return
        }

        api.put(`${urls.categories}/${categoryId}`,form)
        .then(
            dispatch({type:actionTypes.categoryActions.EDİT_CATEGORY, payload: form}),
            navigate("/list-categories")
        )
        .catch()
    }
    return (
        <div>
            <Header />
            <div className="container my-5">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Kategori Adı</label>
                        <input type="text" className="form-control" id="name" placeholder="Roman" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
                        <div className="d-flex justify-content-center my-5">
                            <button disabled={form.name.toLocaleLowerCase("tr-TR") === myCategory.name.toLocaleLowerCase("tr-TR") ? true : false} type="submit" className="btn btn-warning w-50">Güncelle</button>
                        </div>
                    </div>
                </form>

            </div>

        </div>
    )
}

export default Editcategory