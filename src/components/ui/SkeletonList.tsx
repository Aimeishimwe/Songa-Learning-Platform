import { Skeleton } from './Skeleton'

export type SkeletonListProps = {
  count?: number
  lines?: number
}

export function SkeletonList({ count = 3, lines = 2 }: SkeletonListProps) {
  return (
    <div>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 12 }}>
          <div style={{ flex: 1 }}>
            <Skeleton width="60%" />
            {Array.from({ length: lines }).map((__, j) => (
              <div key={j} style={{ marginTop: 8 }}>
                <Skeleton width={j === 0 ? '90%' : '100%'} />
              </div>
            ))}
          </div>
          <div style={{ width: 56 }}>
            <Skeleton width={48} height={48} circle />
          </div>
        </div>
      ))}
    </div>
  )
}

export default SkeletonList
