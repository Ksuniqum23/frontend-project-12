import { Link } from 'react-router-dom'
import Header from '../components/Header.jsx'
import { useTranslation } from 'react-i18next'

function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <Header />
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>{t('ui.page_404.not_found_page')}</h1>
            <p>{t('ui.page_404.not_existing_page')}</p>
            <Link to="/">{t('ui.page_404.back_to_main_page')}</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
