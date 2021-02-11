import { useState, useEffect } from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'

import { addBook, clearBook } from '../../../../store/actions/booksAction'

import { EditorState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const AddBookSchema = Yup.object().shape({
  name: Yup.string().required('Required !'),
  author: Yup.string().required('Required !'),
  pages: Yup.string(),
  rating: Yup.number().required('Required !'),
  price: Yup.number(),
})

const AddPost = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [editContentHtml, setEditContentHtml] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    return () => {
      dispatch(clearBook())
    }
  }, [])

  const dispatch = useDispatch()

  const onPostBook = (values) => {
    dispatch(addBook(values))
  }

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
    setEditContentHtml(stateToHTML(editorState.getCurrentContent()))
  }

  const book = useSelector((state) => state.booksReducer)
  console.log(book)

  // setTimeout(() => {
  //   const showLinks = () => {
  //     <>
  //
  //     </>
  //   }
  // }, 3000);

  return (
    <div className="container admin_layout">
      <h4>Add Post</h4>
          
      <Formik
        initialValues={{
          name: '',
          author: '',
          pages: '',
          rating: '',
          price: 0,
        }}
        validationSchema={AddBookSchema}
        onSubmit={(values, { resetForm }) => {
          onPostBook({
            ...values,
            content: editContentHtml,
          })
          setEditorState(EditorState.createEmpty())
          setEditContentHtml('')
          setTimeout(() => {
            setSuccess(true)
          }, 3000)
          resetForm({})
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          //   isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="twelve colmuns">
                <input
                  type="text"
                  value={values.name}
                  name="name"
                  placeholder="The title of the book"
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleBlur(e)}
                  error={errors.name}
                  className="u-full-width"
                />
                {errors.name && touched.name ? (
                  <div className="error_label">{errors.name}</div>
                ) : null}
              </div>

              {/* EDITOR !!! */}
              <Editor
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
              />

              <h4>Books Info</h4>
              <div className="twelve colmuns">
                <input
                  type="text"
                  value={values.author}
                  name="author"
                  placeholder="The author's name"
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleBlur(e)}
                  error={errors.author}
                  //   touched={touched.author}
                  className="u-full-width"
                />
                {errors.author && touched.author ? (
                  <div className="error_label">{errors.author}</div>
                ) : null}
              </div>
              <div className="twelve colmuns">
                <input
                  type="text"
                  value={values.pages}
                  name="pages"
                  placeholder="Book Pages"
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleBlur(e)}
                  error={errors.pages}
                  //   touched={touched.pages}
                  className="u-full-width"
                />
                {errors.pages && touched.pages ? (
                  <div className="error_label">{errors.pages}</div>
                ) : null}
              </div>

              <div className="twelve colmuns">
                <input
                  type="number"
                  value={values.rating}
                  name="rating"
                  placeholder="Book raiting"
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleBlur(e)}
                  error={errors.rating}
                  //   touched={touched.rating}
                  className="u-full-width"
                />
                {errors.rating && touched.rating ? (
                  <div className="error_label">{errors.rating}</div>
                ) : null}
              </div>
              <div className="twelve colmuns">
                <input
                  type="number"
                  value={values.price}
                  name="price"
                  placeholder="Book price"
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleBlur(e)}
                  error={errors.price}
                  //   touched={touched.price}
                  className="u-full-width"
                />
                {errors.price && touched.price ? (
                  <div className="error_label">{errors.price}</div>
                ) : null}
              </div>
            </div>
            <button type="submit">Add Book</button>

            <br />
            {success ? (
              <div className="succes_entry">
                <div>Congrats for posting your book !</div>
                <Link to={`/admin/posts/edit/${book.add.bookId}`}>See your book</Link>
              </div>
            ) : null}
          </form>
        )}
      </Formik>
    </div>
  )
}

// function mapStateToProps(state) {
//   return {
//     books: state.booksReducer,
//   }
// }
export default AddPost
// export default connect(mapStateToProps)(AddPost)
