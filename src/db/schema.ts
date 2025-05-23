import { relations } from 'drizzle-orm'
import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified')
    .$defaultFn(() => false)
    .notNull(),
  image: text('image'),
  createdAt: timestamp('created_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
  updatedAt: timestamp('updated_at').$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
})

export const resource = pgTable('resource', {
  id: uuid('id').primaryKey().defaultRandom(),
  imageUrl: text('image_url'),
  name: text('name').notNull(),
  description: text('description'),
  url: text('url').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  ownerId: text('owner_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const resourceCategory = pgTable('resource_category', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  resourceId: uuid('resource_id')
    .notNull()
    .references(() => resource.id, { onDelete: 'cascade' }),
  ownerId: text('owner_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const resourceTag = pgTable('resource_tag', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  resourceId: uuid('resource_id')
    .notNull()
    .references(() => resource.id, { onDelete: 'cascade' }),
  ownerId: text('owner_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

// Relations

export const resourceRelations = relations(resource, ({ many, one }) => ({
  categories: one(resourceCategory, {
    fields: [resource.id],
    references: [resourceCategory.resourceId],
  }),
  tags: many(resourceTag),
  owner: one(user, {
    fields: [resource.ownerId],
    references: [user.id],
  }),
}))

export const userRelations = relations(user, ({ many }) => ({
  resources: many(resource),
  resourceCategories: many(resourceCategory),
  resourceTags: many(resourceTag),
}))

export const resourceTagRelations = relations(resourceTag, ({ one }) => ({
  resource: one(resource, {
    fields: [resourceTag.resourceId],
    references: [resource.id],
  }),
  owner: one(user, {
    fields: [resourceTag.ownerId],
    references: [user.id],
  }),
}))

export const resourceCategoryRelations = relations(
  resourceCategory,
  ({ one }) => ({
    resource: one(resource, {
      fields: [resourceCategory.resourceId],
      references: [resource.id],
    }),
    owner: one(user, {
      fields: [resourceCategory.ownerId],
      references: [user.id],
    }),
  }),
)

export type Resource = typeof resource.$inferSelect
export type ResourceCategory = typeof resourceCategory.$inferSelect
export type ResourceTag = typeof resourceTag.$inferSelect
export type ResourceWithCategoriesAndTags = Resource & {
  categories: ResourceCategory
  tags: ResourceTag[]
}
