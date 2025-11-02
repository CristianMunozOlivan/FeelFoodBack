export class DomainError extends Error { constructor(msg: string){ super(msg); this.name='DomainError'; } }
export class ConflictError extends DomainError { constructor(msg='CONFLICT'){ super(msg); this.name='ConflictError'; } }
export class UnauthorizedError extends DomainError { constructor(msg='UNAUTHORIZED'){ super(msg); this.name='UnauthorizedError'; } }
