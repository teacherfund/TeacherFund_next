import styles from './bouncyLoader.module.scss'

const BouncyLoader = ({ label }) => (
  <div className={styles.loader} aria-label={label}>
    <div aria-hidden='true'>
      <span className={styles.piece} />
      <span className={styles.piece} />
      <span className={styles.piece} />
    </div>
  </div>
)

export default BouncyLoader
