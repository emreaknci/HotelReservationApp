export default interface PaginationResult<TEntity> {
    entities: TEntity[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
}
