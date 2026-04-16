"use client";

// src/provider.tsx
import { createContext, useContext, useEffect } from "react";

// src/client.ts
var BASE_PATH = "/api/rs";
async function sdkFetch(path, options) {
  const url = `${BASE_PATH}${path}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers
      }
    });
    if (!res.ok) {
      return {
        data: null,
        error: `Request failed with status ${res.status}`,
        status: res.status
      };
    }
    const data = await res.json();
    return { data, error: null, status: res.status };
  } catch {
    return {
      data: null,
      error: "SDK unavailable",
      status: 0
    };
  }
}

// ../../node_modules/.pnpm/drizzle-orm@0.38.4_@libsql+client@0.15.15_@opentelemetry+api@1.9.0_@types+react@19.2.14_react@19.2.4/node_modules/drizzle-orm/entity.js
var entityKind = /* @__PURE__ */ Symbol.for("drizzle:entityKind");
function is(value, type) {
  if (!value || typeof value !== "object") {
    return false;
  }
  if (value instanceof type) {
    return true;
  }
  if (!Object.prototype.hasOwnProperty.call(type, entityKind)) {
    throw new Error(
      `Class "${type.name ?? "<unknown>"}" doesn't look like a Drizzle entity. If this is incorrect and the class is provided by Drizzle, please report this as a bug.`
    );
  }
  let cls = Object.getPrototypeOf(value).constructor;
  if (cls) {
    while (cls) {
      if (entityKind in cls && cls[entityKind] === type[entityKind]) {
        return true;
      }
      cls = Object.getPrototypeOf(cls);
    }
  }
  return false;
}

// ../../node_modules/.pnpm/drizzle-orm@0.38.4_@libsql+client@0.15.15_@opentelemetry+api@1.9.0_@types+react@19.2.14_react@19.2.4/node_modules/drizzle-orm/column.js
var Column = class {
  constructor(table, config) {
    this.table = table;
    this.config = config;
    this.name = config.name;
    this.keyAsName = config.keyAsName;
    this.notNull = config.notNull;
    this.default = config.default;
    this.defaultFn = config.defaultFn;
    this.onUpdateFn = config.onUpdateFn;
    this.hasDefault = config.hasDefault;
    this.primary = config.primaryKey;
    this.isUnique = config.isUnique;
    this.uniqueName = config.uniqueName;
    this.uniqueType = config.uniqueType;
    this.dataType = config.dataType;
    this.columnType = config.columnType;
    this.generated = config.generated;
    this.generatedIdentity = config.generatedIdentity;
  }
  static [entityKind] = "Column";
  name;
  keyAsName;
  primary;
  notNull;
  default;
  defaultFn;
  onUpdateFn;
  hasDefault;
  isUnique;
  uniqueName;
  uniqueType;
  dataType;
  columnType;
  enumValues = void 0;
  generated = void 0;
  generatedIdentity = void 0;
  config;
  mapFromDriverValue(value) {
    return value;
  }
  mapToDriverValue(value) {
    return value;
  }
  // ** @internal */
  shouldDisableInsert() {
    return this.config.generated !== void 0 && this.config.generated.type !== "byDefault";
  }
};

// ../../node_modules/.pnpm/drizzle-orm@0.38.4_@libsql+client@0.15.15_@opentelemetry+api@1.9.0_@types+react@19.2.14_react@19.2.4/node_modules/drizzle-orm/column-builder.js
var ColumnBuilder = class {
  static [entityKind] = "ColumnBuilder";
  config;
  constructor(name, dataType, columnType) {
    this.config = {
      name,
      keyAsName: name === "",
      notNull: false,
      default: void 0,
      hasDefault: false,
      primaryKey: false,
      isUnique: false,
      uniqueName: void 0,
      uniqueType: void 0,
      dataType,
      columnType,
      generated: void 0
    };
  }
  /**
   * Changes the data type of the column. Commonly used with `json` columns. Also, useful for branded types.
   *
   * @example
   * ```ts
   * const users = pgTable('users', {
   * 	id: integer('id').$type<UserId>().primaryKey(),
   * 	details: json('details').$type<UserDetails>().notNull(),
   * });
   * ```
   */
  $type() {
    return this;
  }
  /**
   * Adds a `not null` clause to the column definition.
   *
   * Affects the `select` model of the table - columns *without* `not null` will be nullable on select.
   */
  notNull() {
    this.config.notNull = true;
    return this;
  }
  /**
   * Adds a `default <value>` clause to the column definition.
   *
   * Affects the `insert` model of the table - columns *with* `default` are optional on insert.
   *
   * If you need to set a dynamic default value, use {@link $defaultFn} instead.
   */
  default(value) {
    this.config.default = value;
    this.config.hasDefault = true;
    return this;
  }
  /**
   * Adds a dynamic default value to the column.
   * The function will be called when the row is inserted, and the returned value will be used as the column value.
   *
   * **Note:** This value does not affect the `drizzle-kit` behavior, it is only used at runtime in `drizzle-orm`.
   */
  $defaultFn(fn) {
    this.config.defaultFn = fn;
    this.config.hasDefault = true;
    return this;
  }
  /**
   * Alias for {@link $defaultFn}.
   */
  $default = this.$defaultFn;
  /**
   * Adds a dynamic update value to the column.
   * The function will be called when the row is updated, and the returned value will be used as the column value if none is provided.
   * If no `default` (or `$defaultFn`) value is provided, the function will be called when the row is inserted as well, and the returned value will be used as the column value.
   *
   * **Note:** This value does not affect the `drizzle-kit` behavior, it is only used at runtime in `drizzle-orm`.
   */
  $onUpdateFn(fn) {
    this.config.onUpdateFn = fn;
    this.config.hasDefault = true;
    return this;
  }
  /**
   * Alias for {@link $onUpdateFn}.
   */
  $onUpdate = this.$onUpdateFn;
  /**
   * Adds a `primary key` clause to the column definition. This implicitly makes the column `not null`.
   *
   * In SQLite, `integer primary key` implicitly makes the column auto-incrementing.
   */
  primaryKey() {
    this.config.primaryKey = true;
    this.config.notNull = true;
    return this;
  }
  /** @internal Sets the name of the column to the key within the table definition if a name was not given. */
  setName(name) {
    if (this.config.name !== "")
      return;
    this.config.name = name;
  }
};

// ../../node_modules/.pnpm/drizzle-orm@0.38.4_@libsql+client@0.15.15_@opentelemetry+api@1.9.0_@types+react@19.2.14_react@19.2.4/node_modules/drizzle-orm/table.utils.js
var TableName = /* @__PURE__ */ Symbol.for("drizzle:Name");

// ../../node_modules/.pnpm/drizzle-orm@0.38.4_@libsql+client@0.15.15_@opentelemetry+api@1.9.0_@types+react@19.2.14_react@19.2.4/node_modules/drizzle-orm/pg-core/foreign-keys.js
var ForeignKeyBuilder = class {
  static [entityKind] = "PgForeignKeyBuilder";
  /** @internal */
  reference;
  /** @internal */
  _onUpdate = "no action";
  /** @internal */
  _onDelete = "no action";
  constructor(config, actions) {
    this.reference = () => {
      const { name, columns, foreignColumns } = config();
      return { name, columns, foreignTable: foreignColumns[0].table, foreignColumns };
    };
    if (actions) {
      this._onUpdate = actions.onUpdate;
      this._onDelete = actions.onDelete;
    }
  }
  onUpdate(action) {
    this._onUpdate = action === void 0 ? "no action" : action;
    return this;
  }
  onDelete(action) {
    this._onDelete = action === void 0 ? "no action" : action;
    return this;
  }
  /** @internal */
  build(table) {
    return new ForeignKey(table, this);
  }
};
var ForeignKey = class {
  constructor(table, builder) {
    this.table = table;
    this.reference = builder.reference;
    this.onUpdate = builder._onUpdate;
    this.onDelete = builder._onDelete;
  }
  static [entityKind] = "PgForeignKey";
  reference;
  onUpdate;
  onDelete;
  getName() {
    const { name, columns, foreignColumns } = this.reference();
    const columnNames = columns.map((column) => column.name);
    const foreignColumnNames = foreignColumns.map((column) => column.name);
    const chunks = [
      this.table[TableName],
      ...columnNames,
      foreignColumns[0].table[TableName],
      ...foreignColumnNames
    ];
    return name ?? `${chunks.join("_")}_fk`;
  }
};

// ../../node_modules/.pnpm/drizzle-orm@0.38.4_@libsql+client@0.15.15_@opentelemetry+api@1.9.0_@types+react@19.2.14_react@19.2.4/node_modules/drizzle-orm/tracing-utils.js
function iife(fn, ...args) {
  return fn(...args);
}

// ../../node_modules/.pnpm/drizzle-orm@0.38.4_@libsql+client@0.15.15_@opentelemetry+api@1.9.0_@types+react@19.2.14_react@19.2.4/node_modules/drizzle-orm/pg-core/unique-constraint.js
function uniqueKeyName(table, columns) {
  return `${table[TableName]}_${columns.join("_")}_unique`;
}
var UniqueConstraintBuilder = class {
  constructor(columns, name) {
    this.name = name;
    this.columns = columns;
  }
  static [entityKind] = "PgUniqueConstraintBuilder";
  /** @internal */
  columns;
  /** @internal */
  nullsNotDistinctConfig = false;
  nullsNotDistinct() {
    this.nullsNotDistinctConfig = true;
    return this;
  }
  /** @internal */
  build(table) {
    return new UniqueConstraint(table, this.columns, this.nullsNotDistinctConfig, this.name);
  }
};
var UniqueOnConstraintBuilder = class {
  static [entityKind] = "PgUniqueOnConstraintBuilder";
  /** @internal */
  name;
  constructor(name) {
    this.name = name;
  }
  on(...columns) {
    return new UniqueConstraintBuilder(columns, this.name);
  }
};
var UniqueConstraint = class {
  constructor(table, columns, nullsNotDistinct, name) {
    this.table = table;
    this.columns = columns;
    this.name = name ?? uniqueKeyName(this.table, this.columns.map((column) => column.name));
    this.nullsNotDistinct = nullsNotDistinct;
  }
  static [entityKind] = "PgUniqueConstraint";
  columns;
  name;
  nullsNotDistinct = false;
  getName() {
    return this.name;
  }
};

// ../../node_modules/.pnpm/drizzle-orm@0.38.4_@libsql+client@0.15.15_@opentelemetry+api@1.9.0_@types+react@19.2.14_react@19.2.4/node_modules/drizzle-orm/pg-core/utils/array.js
function parsePgArrayValue(arrayString, startFrom, inQuotes) {
  for (let i = startFrom; i < arrayString.length; i++) {
    const char = arrayString[i];
    if (char === "\\") {
      i++;
      continue;
    }
    if (char === '"') {
      return [arrayString.slice(startFrom, i).replace(/\\/g, ""), i + 1];
    }
    if (inQuotes) {
      continue;
    }
    if (char === "," || char === "}") {
      return [arrayString.slice(startFrom, i).replace(/\\/g, ""), i];
    }
  }
  return [arrayString.slice(startFrom).replace(/\\/g, ""), arrayString.length];
}
function parsePgNestedArray(arrayString, startFrom = 0) {
  const result = [];
  let i = startFrom;
  let lastCharIsComma = false;
  while (i < arrayString.length) {
    const char = arrayString[i];
    if (char === ",") {
      if (lastCharIsComma || i === startFrom) {
        result.push("");
      }
      lastCharIsComma = true;
      i++;
      continue;
    }
    lastCharIsComma = false;
    if (char === "\\") {
      i += 2;
      continue;
    }
    if (char === '"') {
      const [value2, startFrom2] = parsePgArrayValue(arrayString, i + 1, true);
      result.push(value2);
      i = startFrom2;
      continue;
    }
    if (char === "}") {
      return [result, i + 1];
    }
    if (char === "{") {
      const [value2, startFrom2] = parsePgNestedArray(arrayString, i + 1);
      result.push(value2);
      i = startFrom2;
      continue;
    }
    const [value, newStartFrom] = parsePgArrayValue(arrayString, i, false);
    result.push(value);
    i = newStartFrom;
  }
  return [result, i];
}
function parsePgArray(arrayString) {
  const [result] = parsePgNestedArray(arrayString, 1);
  return result;
}
function makePgArray(array) {
  return `{${array.map((item) => {
    if (Array.isArray(item)) {
      return makePgArray(item);
    }
    if (typeof item === "string") {
      return `"${item.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
    }
    return `${item}`;
  }).join(",")}}`;
}

// ../../node_modules/.pnpm/drizzle-orm@0.38.4_@libsql+client@0.15.15_@opentelemetry+api@1.9.0_@types+react@19.2.14_react@19.2.4/node_modules/drizzle-orm/pg-core/columns/common.js
var PgColumnBuilder = class extends ColumnBuilder {
  foreignKeyConfigs = [];
  static [entityKind] = "PgColumnBuilder";
  array(size) {
    return new PgArrayBuilder(this.config.name, this, size);
  }
  references(ref, actions = {}) {
    this.foreignKeyConfigs.push({ ref, actions });
    return this;
  }
  unique(name, config) {
    this.config.isUnique = true;
    this.config.uniqueName = name;
    this.config.uniqueType = config?.nulls;
    return this;
  }
  generatedAlwaysAs(as) {
    this.config.generated = {
      as,
      type: "always",
      mode: "stored"
    };
    return this;
  }
  /** @internal */
  buildForeignKeys(column, table) {
    return this.foreignKeyConfigs.map(({ ref, actions }) => {
      return iife(
        (ref2, actions2) => {
          const builder = new ForeignKeyBuilder(() => {
            const foreignColumn = ref2();
            return { columns: [column], foreignColumns: [foreignColumn] };
          });
          if (actions2.onUpdate) {
            builder.onUpdate(actions2.onUpdate);
          }
          if (actions2.onDelete) {
            builder.onDelete(actions2.onDelete);
          }
          return builder.build(table);
        },
        ref,
        actions
      );
    });
  }
  /** @internal */
  buildExtraConfigColumn(table) {
    return new ExtraConfigColumn(table, this.config);
  }
};
var PgColumn = class extends Column {
  constructor(table, config) {
    if (!config.uniqueName) {
      config.uniqueName = uniqueKeyName(table, [config.name]);
    }
    super(table, config);
    this.table = table;
  }
  static [entityKind] = "PgColumn";
};
var ExtraConfigColumn = class extends PgColumn {
  static [entityKind] = "ExtraConfigColumn";
  getSQLType() {
    return this.getSQLType();
  }
  indexConfig = {
    order: this.config.order ?? "asc",
    nulls: this.config.nulls ?? "last",
    opClass: this.config.opClass
  };
  defaultConfig = {
    order: "asc",
    nulls: "last",
    opClass: void 0
  };
  asc() {
    this.indexConfig.order = "asc";
    return this;
  }
  desc() {
    this.indexConfig.order = "desc";
    return this;
  }
  nullsFirst() {
    this.indexConfig.nulls = "first";
    return this;
  }
  nullsLast() {
    this.indexConfig.nulls = "last";
    return this;
  }
  /**
   * ### PostgreSQL documentation quote
   *
   * > An operator class with optional parameters can be specified for each column of an index.
   * The operator class identifies the operators to be used by the index for that column.
   * For example, a B-tree index on four-byte integers would use the int4_ops class;
   * this operator class includes comparison functions for four-byte integers.
   * In practice the default operator class for the column's data type is usually sufficient.
   * The main point of having operator classes is that for some data types, there could be more than one meaningful ordering.
   * For example, we might want to sort a complex-number data type either by absolute value or by real part.
   * We could do this by defining two operator classes for the data type and then selecting the proper class when creating an index.
   * More information about operator classes check:
   *
   * ### Useful links
   * https://www.postgresql.org/docs/current/sql-createindex.html
   *
   * https://www.postgresql.org/docs/current/indexes-opclass.html
   *
   * https://www.postgresql.org/docs/current/xindex.html
   *
   * ### Additional types
   * If you have the `pg_vector` extension installed in your database, you can use the
   * `vector_l2_ops`, `vector_ip_ops`, `vector_cosine_ops`, `vector_l1_ops`, `bit_hamming_ops`, `bit_jaccard_ops`, `halfvec_l2_ops`, `sparsevec_l2_ops` options, which are predefined types.
   *
   * **You can always specify any string you want in the operator class, in case Drizzle doesn't have it natively in its types**
   *
   * @param opClass
   * @returns
   */
  op(opClass) {
    this.indexConfig.opClass = opClass;
    return this;
  }
};
var IndexedColumn = class {
  static [entityKind] = "IndexedColumn";
  constructor(name, keyAsName, type, indexConfig) {
    this.name = name;
    this.keyAsName = keyAsName;
    this.type = type;
    this.indexConfig = indexConfig;
  }
  name;
  keyAsName;
  type;
  indexConfig;
};
var PgArrayBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgArrayBuilder";
  constructor(name, baseBuilder, size) {
    super(name, "array", "PgArray");
    this.config.baseBuilder = baseBuilder;
    this.config.size = size;
  }
  /** @internal */
  build(table) {
    const baseColumn = this.config.baseBuilder.build(table);
    return new PgArray(
      table,
      this.config,
      baseColumn
    );
  }
};
var PgArray = class _PgArray extends PgColumn {
  constructor(table, config, baseColumn, range) {
    super(table, config);
    this.baseColumn = baseColumn;
    this.range = range;
    this.size = config.size;
  }
  size;
  static [entityKind] = "PgArray";
  getSQLType() {
    return `${this.baseColumn.getSQLType()}[${typeof this.size === "number" ? this.size : ""}]`;
  }
  mapFromDriverValue(value) {
    if (typeof value === "string") {
      value = parsePgArray(value);
    }
    return value.map((v) => this.baseColumn.mapFromDriverValue(v));
  }
  mapToDriverValue(value, isNestedArray = false) {
    const a = value.map(
      (v) => v === null ? null : is(this.baseColumn, _PgArray) ? this.baseColumn.mapToDriverValue(v, true) : this.baseColumn.mapToDriverValue(v)
    );
    if (isNestedArray)
      return a;
    return makePgArray(a);
  }
};

// ../../node_modules/.pnpm/drizzle-orm@0.38.4_@libsql+client@0.15.15_@opentelemetry+api@1.9.0_@types+react@19.2.14_react@19.2.4/node_modules/drizzle-orm/pg-core/columns/enum.js
var isPgEnumSym = /* @__PURE__ */ Symbol.for("drizzle:isPgEnum");
function isPgEnum(obj) {
  return !!obj && typeof obj === "function" && isPgEnumSym in obj && obj[isPgEnumSym] === true;
}
var PgEnumColumnBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgEnumColumnBuilder";
  constructor(name, enumInstance) {
    super(name, "string", "PgEnumColumn");
    this.config.enum = enumInstance;
  }
  /** @internal */
  build(table) {
    return new PgEnumColumn(
      table,
      this.config
    );
  }
};
var PgEnumColumn = class extends PgColumn {
  static [entityKind] = "PgEnumColumn";
  enum = this.config.enum;
  enumValues = this.config.enum.enumValues;
  constructor(table, config) {
    super(table, config);
    this.enum = config.enum;
  }
  getSQLType() {
    return this.enum.enumName;
  }
};

// ../../node_modules/.pnpm/drizzle-orm@0.38.4_@libsql+client@0.15.15_@opentelemetry+api@1.9.0_@types+react@19.2.14_react@19.2.4/node_modules/drizzle-orm/subquery.js
var Subquery = class {
  static [entityKind] = "Subquery";
  constructor(sql2, selection, alias, isWith = false) {
    this._ = {
      brand: "Subquery",
      sql: sql2,
      selectedFields: selection,
      alias,
      isWith
    };
  }
  // getSQL(): SQL<unknown> {
  // 	return new SQL([this]);
  // }
};
var WithSubquery = class extends Subquery {
  static [entityKind] = "WithSubquery";
};

// ../../node_modules/.pnpm/drizzle-orm@0.38.4_@libsql+client@0.15.15_@opentelemetry+api@1.9.0_@types+react@19.2.14_react@19.2.4/node_modules/drizzle-orm/version.js
var version = "0.38.4";

// ../../node_modules/.pnpm/drizzle-orm@0.38.4_@libsql+client@0.15.15_@opentelemetry+api@1.9.0_@types+react@19.2.14_react@19.2.4/node_modules/drizzle-orm/tracing.js
var otel;
var rawTracer;
var tracer = {
  startActiveSpan(name, fn) {
    if (!otel) {
      return fn();
    }
    if (!rawTracer) {
      rawTracer = otel.trace.getTracer("drizzle-orm", version);
    }
    return iife(
      (otel2, rawTracer2) => rawTracer2.startActiveSpan(
        name,
        (span) => {
          try {
            return fn(span);
          } catch (e) {
            span.setStatus({
              code: otel2.SpanStatusCode.ERROR,
              message: e instanceof Error ? e.message : "Unknown error"
              // eslint-disable-line no-instanceof/no-instanceof
            });
            throw e;
          } finally {
            span.end();
          }
        }
      ),
      otel,
      rawTracer
    );
  }
};

// ../../node_modules/.pnpm/drizzle-orm@0.38.4_@libsql+client@0.15.15_@opentelemetry+api@1.9.0_@types+react@19.2.14_react@19.2.4/node_modules/drizzle-orm/view-common.js
var ViewBaseConfig = /* @__PURE__ */ Symbol.for("drizzle:ViewBaseConfig");

// ../../node_modules/.pnpm/drizzle-orm@0.38.4_@libsql+client@0.15.15_@opentelemetry+api@1.9.0_@types+react@19.2.14_react@19.2.4/node_modules/drizzle-orm/table.js
var Schema = /* @__PURE__ */ Symbol.for("drizzle:Schema");
var Columns = /* @__PURE__ */ Symbol.for("drizzle:Columns");
var ExtraConfigColumns = /* @__PURE__ */ Symbol.for("drizzle:ExtraConfigColumns");
var OriginalName = /* @__PURE__ */ Symbol.for("drizzle:OriginalName");
var BaseName = /* @__PURE__ */ Symbol.for("drizzle:BaseName");
var IsAlias = /* @__PURE__ */ Symbol.for("drizzle:IsAlias");
var ExtraConfigBuilder = /* @__PURE__ */ Symbol.for("drizzle:ExtraConfigBuilder");
var IsDrizzleTable = /* @__PURE__ */ Symbol.for("drizzle:IsDrizzleTable");
var Table = class {
  static [entityKind] = "Table";
  /** @internal */
  static Symbol = {
    Name: TableName,
    Schema,
    OriginalName,
    Columns,
    ExtraConfigColumns,
    BaseName,
    IsAlias,
    ExtraConfigBuilder
  };
  /**
   * @internal
   * Can be changed if the table is aliased.
   */
  [TableName];
  /**
   * @internal
   * Used to store the original name of the table, before any aliasing.
   */
  [OriginalName];
  /** @internal */
  [Schema];
  /** @internal */
  [Columns];
  /** @internal */
  [ExtraConfigColumns];
  /**
   *  @internal
   * Used to store the table name before the transformation via the `tableCreator` functions.
   */
  [BaseName];
  /** @internal */
  [IsAlias] = false;
  /** @internal */
  [IsDrizzleTable] = true;
  /** @internal */
  [ExtraConfigBuilder] = void 0;
  constructor(name, schema, baseName) {
    this[TableName] = this[OriginalName] = name;
    this[Schema] = schema;
    this[BaseName] = baseName;
  }
};

// ../../node_modules/.pnpm/drizzle-orm@0.38.4_@libsql+client@0.15.15_@opentelemetry+api@1.9.0_@types+react@19.2.14_react@19.2.4/node_modules/drizzle-orm/sql/sql.js
var FakePrimitiveParam = class {
  static [entityKind] = "FakePrimitiveParam";
};
function isSQLWrapper(value) {
  return value !== null && value !== void 0 && typeof value.getSQL === "function";
}
function mergeQueries(queries) {
  const result = { sql: "", params: [] };
  for (const query of queries) {
    result.sql += query.sql;
    result.params.push(...query.params);
    if (query.typings?.length) {
      if (!result.typings) {
        result.typings = [];
      }
      result.typings.push(...query.typings);
    }
  }
  return result;
}
var StringChunk = class {
  static [entityKind] = "StringChunk";
  value;
  constructor(value) {
    this.value = Array.isArray(value) ? value : [value];
  }
  getSQL() {
    return new SQL([this]);
  }
};
var SQL = class _SQL {
  constructor(queryChunks) {
    this.queryChunks = queryChunks;
  }
  static [entityKind] = "SQL";
  /** @internal */
  decoder = noopDecoder;
  shouldInlineParams = false;
  append(query) {
    this.queryChunks.push(...query.queryChunks);
    return this;
  }
  toQuery(config) {
    return tracer.startActiveSpan("drizzle.buildSQL", (span) => {
      const query = this.buildQueryFromSourceParams(this.queryChunks, config);
      span?.setAttributes({
        "drizzle.query.text": query.sql,
        "drizzle.query.params": JSON.stringify(query.params)
      });
      return query;
    });
  }
  buildQueryFromSourceParams(chunks, _config) {
    const config = Object.assign({}, _config, {
      inlineParams: _config.inlineParams || this.shouldInlineParams,
      paramStartIndex: _config.paramStartIndex || { value: 0 }
    });
    const {
      casing,
      escapeName,
      escapeParam,
      prepareTyping,
      inlineParams,
      paramStartIndex
    } = config;
    return mergeQueries(chunks.map((chunk) => {
      if (is(chunk, StringChunk)) {
        return { sql: chunk.value.join(""), params: [] };
      }
      if (is(chunk, Name)) {
        return { sql: escapeName(chunk.value), params: [] };
      }
      if (chunk === void 0) {
        return { sql: "", params: [] };
      }
      if (Array.isArray(chunk)) {
        const result = [new StringChunk("(")];
        for (const [i, p] of chunk.entries()) {
          result.push(p);
          if (i < chunk.length - 1) {
            result.push(new StringChunk(", "));
          }
        }
        result.push(new StringChunk(")"));
        return this.buildQueryFromSourceParams(result, config);
      }
      if (is(chunk, _SQL)) {
        return this.buildQueryFromSourceParams(chunk.queryChunks, {
          ...config,
          inlineParams: inlineParams || chunk.shouldInlineParams
        });
      }
      if (is(chunk, Table)) {
        const schemaName = chunk[Table.Symbol.Schema];
        const tableName = chunk[Table.Symbol.Name];
        return {
          sql: schemaName === void 0 ? escapeName(tableName) : escapeName(schemaName) + "." + escapeName(tableName),
          params: []
        };
      }
      if (is(chunk, Column)) {
        const columnName = casing.getColumnCasing(chunk);
        if (_config.invokeSource === "indexes") {
          return { sql: escapeName(columnName), params: [] };
        }
        const schemaName = chunk.table[Table.Symbol.Schema];
        return {
          sql: chunk.table[IsAlias] || schemaName === void 0 ? escapeName(chunk.table[Table.Symbol.Name]) + "." + escapeName(columnName) : escapeName(schemaName) + "." + escapeName(chunk.table[Table.Symbol.Name]) + "." + escapeName(columnName),
          params: []
        };
      }
      if (is(chunk, View)) {
        const schemaName = chunk[ViewBaseConfig].schema;
        const viewName = chunk[ViewBaseConfig].name;
        return {
          sql: schemaName === void 0 ? escapeName(viewName) : escapeName(schemaName) + "." + escapeName(viewName),
          params: []
        };
      }
      if (is(chunk, Param)) {
        if (is(chunk.value, Placeholder)) {
          return { sql: escapeParam(paramStartIndex.value++, chunk), params: [chunk], typings: ["none"] };
        }
        const mappedValue = chunk.value === null ? null : chunk.encoder.mapToDriverValue(chunk.value);
        if (is(mappedValue, _SQL)) {
          return this.buildQueryFromSourceParams([mappedValue], config);
        }
        if (inlineParams) {
          return { sql: this.mapInlineParam(mappedValue, config), params: [] };
        }
        let typings = ["none"];
        if (prepareTyping) {
          typings = [prepareTyping(chunk.encoder)];
        }
        return { sql: escapeParam(paramStartIndex.value++, mappedValue), params: [mappedValue], typings };
      }
      if (is(chunk, Placeholder)) {
        return { sql: escapeParam(paramStartIndex.value++, chunk), params: [chunk], typings: ["none"] };
      }
      if (is(chunk, _SQL.Aliased) && chunk.fieldAlias !== void 0) {
        return { sql: escapeName(chunk.fieldAlias), params: [] };
      }
      if (is(chunk, Subquery)) {
        if (chunk._.isWith) {
          return { sql: escapeName(chunk._.alias), params: [] };
        }
        return this.buildQueryFromSourceParams([
          new StringChunk("("),
          chunk._.sql,
          new StringChunk(") "),
          new Name(chunk._.alias)
        ], config);
      }
      if (isPgEnum(chunk)) {
        if (chunk.schema) {
          return { sql: escapeName(chunk.schema) + "." + escapeName(chunk.enumName), params: [] };
        }
        return { sql: escapeName(chunk.enumName), params: [] };
      }
      if (isSQLWrapper(chunk)) {
        if (chunk.shouldOmitSQLParens?.()) {
          return this.buildQueryFromSourceParams([chunk.getSQL()], config);
        }
        return this.buildQueryFromSourceParams([
          new StringChunk("("),
          chunk.getSQL(),
          new StringChunk(")")
        ], config);
      }
      if (inlineParams) {
        return { sql: this.mapInlineParam(chunk, config), params: [] };
      }
      return { sql: escapeParam(paramStartIndex.value++, chunk), params: [chunk], typings: ["none"] };
    }));
  }
  mapInlineParam(chunk, { escapeString }) {
    if (chunk === null) {
      return "null";
    }
    if (typeof chunk === "number" || typeof chunk === "boolean") {
      return chunk.toString();
    }
    if (typeof chunk === "string") {
      return escapeString(chunk);
    }
    if (typeof chunk === "object") {
      const mappedValueAsString = chunk.toString();
      if (mappedValueAsString === "[object Object]") {
        return escapeString(JSON.stringify(chunk));
      }
      return escapeString(mappedValueAsString);
    }
    throw new Error("Unexpected param value: " + chunk);
  }
  getSQL() {
    return this;
  }
  as(alias) {
    if (alias === void 0) {
      return this;
    }
    return new _SQL.Aliased(this, alias);
  }
  mapWith(decoder) {
    this.decoder = typeof decoder === "function" ? { mapFromDriverValue: decoder } : decoder;
    return this;
  }
  inlineParams() {
    this.shouldInlineParams = true;
    return this;
  }
  /**
   * This method is used to conditionally include a part of the query.
   *
   * @param condition - Condition to check
   * @returns itself if the condition is `true`, otherwise `undefined`
   */
  if(condition) {
    return condition ? this : void 0;
  }
};
var Name = class {
  constructor(value) {
    this.value = value;
  }
  static [entityKind] = "Name";
  brand;
  getSQL() {
    return new SQL([this]);
  }
};
var noopDecoder = {
  mapFromDriverValue: (value) => value
};
var noopEncoder = {
  mapToDriverValue: (value) => value
};
var noopMapper = {
  ...noopDecoder,
  ...noopEncoder
};
var Param = class {
  /**
   * @param value - Parameter value
   * @param encoder - Encoder to convert the value to a driver parameter
   */
  constructor(value, encoder = noopEncoder) {
    this.value = value;
    this.encoder = encoder;
  }
  static [entityKind] = "Param";
  brand;
  getSQL() {
    return new SQL([this]);
  }
};
function sql(strings, ...params) {
  const queryChunks = [];
  if (params.length > 0 || strings.length > 0 && strings[0] !== "") {
    queryChunks.push(new StringChunk(strings[0]));
  }
  for (const [paramIndex, param2] of params.entries()) {
    queryChunks.push(param2, new StringChunk(strings[paramIndex + 1]));
  }
  return new SQL(queryChunks);
}
((sql2) => {
  function empty() {
    return new SQL([]);
  }
  sql2.empty = empty;
  function fromList(list) {
    return new SQL(list);
  }
  sql2.fromList = fromList;
  function raw(str) {
    return new SQL([new StringChunk(str)]);
  }
  sql2.raw = raw;
  function join(chunks, separator) {
    const result = [];
    for (const [i, chunk] of chunks.entries()) {
      if (i > 0 && separator !== void 0) {
        result.push(separator);
      }
      result.push(chunk);
    }
    return new SQL(result);
  }
  sql2.join = join;
  function identifier(value) {
    return new Name(value);
  }
  sql2.identifier = identifier;
  function placeholder2(name2) {
    return new Placeholder(name2);
  }
  sql2.placeholder = placeholder2;
  function param2(value, encoder) {
    return new Param(value, encoder);
  }
  sql2.param = param2;
})(sql || (sql = {}));
((SQL2) => {
  class Aliased {
    constructor(sql2, fieldAlias) {
      this.sql = sql2;
      this.fieldAlias = fieldAlias;
    }
    static [entityKind] = "SQL.Aliased";
    /** @internal */
    isSelectionField = false;
    getSQL() {
      return this.sql;
    }
    /** @internal */
    clone() {
      return new Aliased(this.sql, this.fieldAlias);
    }
  }
  SQL2.Aliased = Aliased;
})(SQL || (SQL = {}));
var Placeholder = class {
  constructor(name2) {
    this.name = name2;
  }
  static [entityKind] = "Placeholder";
  getSQL() {
    return new SQL([this]);
  }
};
var IsDrizzleView = /* @__PURE__ */ Symbol.for("drizzle:IsDrizzleView");
var View = class {
  static [entityKind] = "View";
  /** @internal */
  [ViewBaseConfig];
  /** @internal */
  [IsDrizzleView] = true;
  constructor({ name: name2, schema, selectedFields, query }) {
    this[ViewBaseConfig] = {
      name: name2,
      originalName: name2,
      schema,
      selectedFields,
      query,
      isExisting: !query,
      isAlias: false
    };
  }
  getSQL() {
    return new SQL([this]);
  }
};
Column.prototype.getSQL = function() {
  return new SQL([this]);
};
Table.prototype.getSQL = function() {
  return new SQL([this]);
};
Subquery.prototype.getSQL = function() {
  return new SQL([this]);
};

// ../../node_modules/.pnpm/drizzle-orm@0.38.4_@libsql+client@0.15.15_@opentelemetry+api@1.9.0_@types+react@19.2.14_react@19.2.4/node_modules/drizzle-orm/utils.js
function getColumnNameAndConfig(a, b) {
  return {
    name: typeof a === "string" && a.length > 0 ? a : "",
    config: typeof a === "object" ? a : b
  };
}

// ../../node_modules/.pnpm/drizzle-orm@0.38.4_@libsql+client@0.15.15_@opentelemetry+api@1.9.0_@types+react@19.2.14_react@19.2.4/node_modules/drizzle-orm/sqlite-core/foreign-keys.js
var ForeignKeyBuilder2 = class {
  static [entityKind] = "SQLiteForeignKeyBuilder";
  /** @internal */
  reference;
  /** @internal */
  _onUpdate;
  /** @internal */
  _onDelete;
  constructor(config, actions) {
    this.reference = () => {
      const { name, columns, foreignColumns } = config();
      return { name, columns, foreignTable: foreignColumns[0].table, foreignColumns };
    };
    if (actions) {
      this._onUpdate = actions.onUpdate;
      this._onDelete = actions.onDelete;
    }
  }
  onUpdate(action) {
    this._onUpdate = action;
    return this;
  }
  onDelete(action) {
    this._onDelete = action;
    return this;
  }
  /** @internal */
  build(table) {
    return new ForeignKey2(table, this);
  }
};
var ForeignKey2 = class {
  constructor(table, builder) {
    this.table = table;
    this.reference = builder.reference;
    this.onUpdate = builder._onUpdate;
    this.onDelete = builder._onDelete;
  }
  static [entityKind] = "SQLiteForeignKey";
  reference;
  onUpdate;
  onDelete;
  getName() {
    const { name, columns, foreignColumns } = this.reference();
    const columnNames = columns.map((column) => column.name);
    const foreignColumnNames = foreignColumns.map((column) => column.name);
    const chunks = [
      this.table[TableName],
      ...columnNames,
      foreignColumns[0].table[TableName],
      ...foreignColumnNames
    ];
    return name ?? `${chunks.join("_")}_fk`;
  }
};

// ../../node_modules/.pnpm/drizzle-orm@0.38.4_@libsql+client@0.15.15_@opentelemetry+api@1.9.0_@types+react@19.2.14_react@19.2.4/node_modules/drizzle-orm/sqlite-core/unique-constraint.js
function uniqueKeyName2(table, columns) {
  return `${table[TableName]}_${columns.join("_")}_unique`;
}
var UniqueConstraintBuilder2 = class {
  constructor(columns, name) {
    this.name = name;
    this.columns = columns;
  }
  static [entityKind] = "SQLiteUniqueConstraintBuilder";
  /** @internal */
  columns;
  /** @internal */
  build(table) {
    return new UniqueConstraint2(table, this.columns, this.name);
  }
};
var UniqueOnConstraintBuilder2 = class {
  static [entityKind] = "SQLiteUniqueOnConstraintBuilder";
  /** @internal */
  name;
  constructor(name) {
    this.name = name;
  }
  on(...columns) {
    return new UniqueConstraintBuilder2(columns, this.name);
  }
};
var UniqueConstraint2 = class {
  constructor(table, columns, name) {
    this.table = table;
    this.columns = columns;
    this.name = name ?? uniqueKeyName2(this.table, this.columns.map((column) => column.name));
  }
  static [entityKind] = "SQLiteUniqueConstraint";
  columns;
  name;
  getName() {
    return this.name;
  }
};

// ../../node_modules/.pnpm/drizzle-orm@0.38.4_@libsql+client@0.15.15_@opentelemetry+api@1.9.0_@types+react@19.2.14_react@19.2.4/node_modules/drizzle-orm/sqlite-core/columns/common.js
var SQLiteColumnBuilder = class extends ColumnBuilder {
  static [entityKind] = "SQLiteColumnBuilder";
  foreignKeyConfigs = [];
  references(ref, actions = {}) {
    this.foreignKeyConfigs.push({ ref, actions });
    return this;
  }
  unique(name) {
    this.config.isUnique = true;
    this.config.uniqueName = name;
    return this;
  }
  generatedAlwaysAs(as, config) {
    this.config.generated = {
      as,
      type: "always",
      mode: config?.mode ?? "virtual"
    };
    return this;
  }
  /** @internal */
  buildForeignKeys(column, table) {
    return this.foreignKeyConfigs.map(({ ref, actions }) => {
      return ((ref2, actions2) => {
        const builder = new ForeignKeyBuilder2(() => {
          const foreignColumn = ref2();
          return { columns: [column], foreignColumns: [foreignColumn] };
        });
        if (actions2.onUpdate) {
          builder.onUpdate(actions2.onUpdate);
        }
        if (actions2.onDelete) {
          builder.onDelete(actions2.onDelete);
        }
        return builder.build(table);
      })(ref, actions);
    });
  }
};
var SQLiteColumn = class extends Column {
  constructor(table, config) {
    if (!config.uniqueName) {
      config.uniqueName = uniqueKeyName2(table, [config.name]);
    }
    super(table, config);
    this.table = table;
  }
  static [entityKind] = "SQLiteColumn";
};

// ../../node_modules/.pnpm/drizzle-orm@0.38.4_@libsql+client@0.15.15_@opentelemetry+api@1.9.0_@types+react@19.2.14_react@19.2.4/node_modules/drizzle-orm/sqlite-core/columns/blob.js
var SQLiteBigIntBuilder = class extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteBigIntBuilder";
  constructor(name) {
    super(name, "bigint", "SQLiteBigInt");
  }
  /** @internal */
  build(table) {
    return new SQLiteBigInt(table, this.config);
  }
};
var SQLiteBigInt = class extends SQLiteColumn {
  static [entityKind] = "SQLiteBigInt";
  getSQLType() {
    return "blob";
  }
  mapFromDriverValue(value) {
    if (Buffer.isBuffer(value)) {
      return BigInt(value.toString());
    }
    if (value instanceof ArrayBuffer) {
      const decoder = new TextDecoder();
      return BigInt(decoder.decode(value));
    }
    return BigInt(String.fromCodePoint(...value));
  }
  mapToDriverValue(value) {
    return Buffer.from(value.toString());
  }
};
var SQLiteBlobJsonBuilder = class extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteBlobJsonBuilder";
  constructor(name) {
    super(name, "json", "SQLiteBlobJson");
  }
  /** @internal */
  build(table) {
    return new SQLiteBlobJson(
      table,
      this.config
    );
  }
};
var SQLiteBlobJson = class extends SQLiteColumn {
  static [entityKind] = "SQLiteBlobJson";
  getSQLType() {
    return "blob";
  }
  mapFromDriverValue(value) {
    if (Buffer.isBuffer(value)) {
      return JSON.parse(value.toString());
    }
    if (value instanceof ArrayBuffer) {
      const decoder = new TextDecoder();
      return JSON.parse(decoder.decode(value));
    }
    return JSON.parse(String.fromCodePoint(...value));
  }
  mapToDriverValue(value) {
    return Buffer.from(JSON.stringify(value));
  }
};
var SQLiteBlobBufferBuilder = class extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteBlobBufferBuilder";
  constructor(name) {
    super(name, "buffer", "SQLiteBlobBuffer");
  }
  /** @internal */
  build(table) {
    return new SQLiteBlobBuffer(table, this.config);
  }
};
var SQLiteBlobBuffer = class extends SQLiteColumn {
  static [entityKind] = "SQLiteBlobBuffer";
  getSQLType() {
    return "blob";
  }
};
function blob(a, b) {
  const { name, config } = getColumnNameAndConfig(a, b);
  if (config?.mode === "json") {
    return new SQLiteBlobJsonBuilder(name);
  }
  if (config?.mode === "bigint") {
    return new SQLiteBigIntBuilder(name);
  }
  return new SQLiteBlobBufferBuilder(name);
}

// ../../node_modules/.pnpm/drizzle-orm@0.38.4_@libsql+client@0.15.15_@opentelemetry+api@1.9.0_@types+react@19.2.14_react@19.2.4/node_modules/drizzle-orm/sqlite-core/columns/custom.js
var SQLiteCustomColumnBuilder = class extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteCustomColumnBuilder";
  constructor(name, fieldConfig, customTypeParams) {
    super(name, "custom", "SQLiteCustomColumn");
    this.config.fieldConfig = fieldConfig;
    this.config.customTypeParams = customTypeParams;
  }
  /** @internal */
  build(table) {
    return new SQLiteCustomColumn(
      table,
      this.config
    );
  }
};
var SQLiteCustomColumn = class extends SQLiteColumn {
  static [entityKind] = "SQLiteCustomColumn";
  sqlName;
  mapTo;
  mapFrom;
  constructor(table, config) {
    super(table, config);
    this.sqlName = config.customTypeParams.dataType(config.fieldConfig);
    this.mapTo = config.customTypeParams.toDriver;
    this.mapFrom = config.customTypeParams.fromDriver;
  }
  getSQLType() {
    return this.sqlName;
  }
  mapFromDriverValue(value) {
    return typeof this.mapFrom === "function" ? this.mapFrom(value) : value;
  }
  mapToDriverValue(value) {
    return typeof this.mapTo === "function" ? this.mapTo(value) : value;
  }
};
function customType(customTypeParams) {
  return (a, b) => {
    const { name, config } = getColumnNameAndConfig(a, b);
    return new SQLiteCustomColumnBuilder(
      name,
      config,
      customTypeParams
    );
  };
}

// ../../node_modules/.pnpm/drizzle-orm@0.38.4_@libsql+client@0.15.15_@opentelemetry+api@1.9.0_@types+react@19.2.14_react@19.2.4/node_modules/drizzle-orm/sqlite-core/columns/integer.js
var SQLiteBaseIntegerBuilder = class extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteBaseIntegerBuilder";
  constructor(name, dataType, columnType) {
    super(name, dataType, columnType);
    this.config.autoIncrement = false;
  }
  primaryKey(config) {
    if (config?.autoIncrement) {
      this.config.autoIncrement = true;
    }
    this.config.hasDefault = true;
    return super.primaryKey();
  }
};
var SQLiteBaseInteger = class extends SQLiteColumn {
  static [entityKind] = "SQLiteBaseInteger";
  autoIncrement = this.config.autoIncrement;
  getSQLType() {
    return "integer";
  }
};
var SQLiteIntegerBuilder = class extends SQLiteBaseIntegerBuilder {
  static [entityKind] = "SQLiteIntegerBuilder";
  constructor(name) {
    super(name, "number", "SQLiteInteger");
  }
  build(table) {
    return new SQLiteInteger(
      table,
      this.config
    );
  }
};
var SQLiteInteger = class extends SQLiteBaseInteger {
  static [entityKind] = "SQLiteInteger";
};
var SQLiteTimestampBuilder = class extends SQLiteBaseIntegerBuilder {
  static [entityKind] = "SQLiteTimestampBuilder";
  constructor(name, mode) {
    super(name, "date", "SQLiteTimestamp");
    this.config.mode = mode;
  }
  /**
   * @deprecated Use `default()` with your own expression instead.
   *
   * Adds `DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer))` to the column, which is the current epoch timestamp in milliseconds.
   */
  defaultNow() {
    return this.default(sql`(cast((julianday('now') - 2440587.5)*86400000 as integer))`);
  }
  build(table) {
    return new SQLiteTimestamp(
      table,
      this.config
    );
  }
};
var SQLiteTimestamp = class extends SQLiteBaseInteger {
  static [entityKind] = "SQLiteTimestamp";
  mode = this.config.mode;
  mapFromDriverValue(value) {
    if (this.config.mode === "timestamp") {
      return new Date(value * 1e3);
    }
    return new Date(value);
  }
  mapToDriverValue(value) {
    const unix = value.getTime();
    if (this.config.mode === "timestamp") {
      return Math.floor(unix / 1e3);
    }
    return unix;
  }
};
var SQLiteBooleanBuilder = class extends SQLiteBaseIntegerBuilder {
  static [entityKind] = "SQLiteBooleanBuilder";
  constructor(name, mode) {
    super(name, "boolean", "SQLiteBoolean");
    this.config.mode = mode;
  }
  build(table) {
    return new SQLiteBoolean(
      table,
      this.config
    );
  }
};
var SQLiteBoolean = class extends SQLiteBaseInteger {
  static [entityKind] = "SQLiteBoolean";
  mode = this.config.mode;
  mapFromDriverValue(value) {
    return Number(value) === 1;
  }
  mapToDriverValue(value) {
    return value ? 1 : 0;
  }
};
function integer(a, b) {
  const { name, config } = getColumnNameAndConfig(a, b);
  if (config?.mode === "timestamp" || config?.mode === "timestamp_ms") {
    return new SQLiteTimestampBuilder(name, config.mode);
  }
  if (config?.mode === "boolean") {
    return new SQLiteBooleanBuilder(name, config.mode);
  }
  return new SQLiteIntegerBuilder(name);
}

// ../../node_modules/.pnpm/drizzle-orm@0.38.4_@libsql+client@0.15.15_@opentelemetry+api@1.9.0_@types+react@19.2.14_react@19.2.4/node_modules/drizzle-orm/sqlite-core/columns/numeric.js
var SQLiteNumericBuilder = class extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteNumericBuilder";
  constructor(name) {
    super(name, "string", "SQLiteNumeric");
  }
  /** @internal */
  build(table) {
    return new SQLiteNumeric(
      table,
      this.config
    );
  }
};
var SQLiteNumeric = class extends SQLiteColumn {
  static [entityKind] = "SQLiteNumeric";
  getSQLType() {
    return "numeric";
  }
};
function numeric(name) {
  return new SQLiteNumericBuilder(name ?? "");
}

// ../../node_modules/.pnpm/drizzle-orm@0.38.4_@libsql+client@0.15.15_@opentelemetry+api@1.9.0_@types+react@19.2.14_react@19.2.4/node_modules/drizzle-orm/sqlite-core/columns/real.js
var SQLiteRealBuilder = class extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteRealBuilder";
  constructor(name) {
    super(name, "number", "SQLiteReal");
  }
  /** @internal */
  build(table) {
    return new SQLiteReal(table, this.config);
  }
};
var SQLiteReal = class extends SQLiteColumn {
  static [entityKind] = "SQLiteReal";
  getSQLType() {
    return "real";
  }
};
function real(name) {
  return new SQLiteRealBuilder(name ?? "");
}

// ../../node_modules/.pnpm/drizzle-orm@0.38.4_@libsql+client@0.15.15_@opentelemetry+api@1.9.0_@types+react@19.2.14_react@19.2.4/node_modules/drizzle-orm/sqlite-core/columns/text.js
var SQLiteTextBuilder = class extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteTextBuilder";
  constructor(name, config) {
    super(name, "string", "SQLiteText");
    this.config.enumValues = config.enum;
    this.config.length = config.length;
  }
  /** @internal */
  build(table) {
    return new SQLiteText(
      table,
      this.config
    );
  }
};
var SQLiteText = class extends SQLiteColumn {
  static [entityKind] = "SQLiteText";
  enumValues = this.config.enumValues;
  length = this.config.length;
  constructor(table, config) {
    super(table, config);
  }
  getSQLType() {
    return `text${this.config.length ? `(${this.config.length})` : ""}`;
  }
};
var SQLiteTextJsonBuilder = class extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteTextJsonBuilder";
  constructor(name) {
    super(name, "json", "SQLiteTextJson");
  }
  /** @internal */
  build(table) {
    return new SQLiteTextJson(
      table,
      this.config
    );
  }
};
var SQLiteTextJson = class extends SQLiteColumn {
  static [entityKind] = "SQLiteTextJson";
  getSQLType() {
    return "text";
  }
  mapFromDriverValue(value) {
    return JSON.parse(value);
  }
  mapToDriverValue(value) {
    return JSON.stringify(value);
  }
};
function text(a, b = {}) {
  const { name, config } = getColumnNameAndConfig(a, b);
  if (config.mode === "json") {
    return new SQLiteTextJsonBuilder(name);
  }
  return new SQLiteTextBuilder(name, config);
}

// ../../node_modules/.pnpm/drizzle-orm@0.38.4_@libsql+client@0.15.15_@opentelemetry+api@1.9.0_@types+react@19.2.14_react@19.2.4/node_modules/drizzle-orm/sqlite-core/columns/all.js
function getSQLiteColumnBuilders() {
  return {
    blob,
    customType,
    integer,
    numeric,
    real,
    text
  };
}

// ../../node_modules/.pnpm/drizzle-orm@0.38.4_@libsql+client@0.15.15_@opentelemetry+api@1.9.0_@types+react@19.2.14_react@19.2.4/node_modules/drizzle-orm/sqlite-core/table.js
var InlineForeignKeys = /* @__PURE__ */ Symbol.for("drizzle:SQLiteInlineForeignKeys");
var SQLiteTable = class extends Table {
  static [entityKind] = "SQLiteTable";
  /** @internal */
  static Symbol = Object.assign({}, Table.Symbol, {
    InlineForeignKeys
  });
  /** @internal */
  [Table.Symbol.Columns];
  /** @internal */
  [InlineForeignKeys] = [];
  /** @internal */
  [Table.Symbol.ExtraConfigBuilder] = void 0;
};
function sqliteTableBase(name, columns, extraConfig, schema, baseName = name) {
  const rawTable = new SQLiteTable(name, schema, baseName);
  const parsedColumns = typeof columns === "function" ? columns(getSQLiteColumnBuilders()) : columns;
  const builtColumns = Object.fromEntries(
    Object.entries(parsedColumns).map(([name2, colBuilderBase]) => {
      const colBuilder = colBuilderBase;
      colBuilder.setName(name2);
      const column = colBuilder.build(rawTable);
      rawTable[InlineForeignKeys].push(...colBuilder.buildForeignKeys(column, rawTable));
      return [name2, column];
    })
  );
  const table = Object.assign(rawTable, builtColumns);
  table[Table.Symbol.Columns] = builtColumns;
  table[Table.Symbol.ExtraConfigColumns] = builtColumns;
  if (extraConfig) {
    table[SQLiteTable.Symbol.ExtraConfigBuilder] = extraConfig;
  }
  return table;
}
var sqliteTable = (name, columns, extraConfig) => {
  return sqliteTableBase(name, columns, extraConfig);
};

// ../types/src/schema.ts
var blogAuthors = sqliteTable("blog_authors", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  email: text("email"),
  bio: text("bio"),
  avatarUrl: text("avatar_url"),
  websiteUrl: text("website_url"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
});
var blogPosts = sqliteTable("blog_posts", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  urlPath: text("url_path"),
  title: text("title").notNull(),
  content: text("content").notNull(),
  language: text("language").notNull().default("en"),
  parentPostId: text("parent_post_id"),
  authorId: text("author_id"),
  status: text("status", { enum: ["draft", "published", "archived"] }).notNull().default("draft"),
  heroImageUrl: text("hero_image_url"),
  seoTitle: text("seo_title"),
  seoDesc: text("seo_desc"),
  publishedAt: integer("published_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
});
var socialPosts = sqliteTable("social_posts", {
  id: text("id").primaryKey(),
  platform: text("platform", { enum: ["instagram", "linkedin", "facebook"] }).notNull(),
  content: text("content").notNull(),
  scheduledAt: integer("scheduled_at", { mode: "timestamp" }),
  status: text("status", { enum: ["pending", "published", "cancelled"] }).notNull().default("pending"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull()
});
var businessConfig = sqliteTable("business_config", {
  id: text("id").primaryKey().default("config"),
  name: text("name"),
  description: text("description"),
  hours: text("hours"),
  contact: text("contact"),
  address: text("address"),
  phone: text("phone"),
  email: text("email"),
  website: text("website"),
  seo: text("seo"),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
});
var variables = sqliteTable("variables", {
  id: text("id").primaryKey(),
  key: text("key").notNull(),
  value: text("value").notNull(),
  note: text("note"),
  scope: text("scope", { enum: ["company", "user"] }).notNull().default("company"),
  userId: text("user_id"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
});
var analytics = sqliteTable("analytics", {
  id: text("id").primaryKey(),
  eventType: text("event_type").notNull(),
  page: text("page"),
  sessionId: text("session_id"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull()
});
var forms = sqliteTable("forms", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  fields: text("fields").notNull(),
  // JSON array of FormField[]
  settings: text("settings"),
  // JSON FormSettings object
  status: text("status", { enum: ["active", "archived"] }).notNull().default("active"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
});
var formSubmissions = sqliteTable("form_submissions", {
  id: text("id").primaryKey(),
  formId: text("form_id").notNull(),
  data: text("data").notNull(),
  // JSON object of field values
  metadata: text("metadata"),
  // JSON: IP, user agent, referrer
  createdAt: integer("created_at", { mode: "timestamp" }).notNull()
});
var files = sqliteTable("files", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  gcsPath: text("gcs_path").notNull(),
  visibility: text("visibility", { enum: ["public", "private", "password"] }).notNull().default("private"),
  passwordHash: text("password_hash"),
  contentType: text("content_type").notNull(),
  sizeBytes: integer("size_bytes").notNull(),
  category: text("category", { enum: ["blog", "brand", "document", "general"] }).notNull().default("general"),
  uploadedBy: text("uploaded_by"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
});
var crmOrganizations = sqliteTable("crm_organizations", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  website: text("website"),
  industry: text("industry"),
  size: text("size", { enum: ["1-10", "11-50", "51-200", "201-500", "500+"] }),
  phone: text("phone"),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  country: text("country"),
  notes: text("notes"),
  customFields: text("custom_fields"),
  // JSON Record<string, unknown>
  status: text("status", { enum: ["active", "archived"] }).notNull().default("active"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
});
var crmContacts = sqliteTable("crm_contacts", {
  id: text("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email"),
  phone: text("phone"),
  company: text("company"),
  organizationId: text("organization_id"),
  jobTitle: text("job_title"),
  source: text("source", { enum: ["form", "manual", "import", "sdk", "lead_finder"] }).notNull().default("manual"),
  sourceId: text("source_id"),
  ownerId: text("owner_id"),
  tags: text("tags"),
  // JSON string[]
  notes: text("notes"),
  status: text("status", { enum: ["active", "archived"] }).notNull().default("active"),
  customFields: text("custom_fields"),
  // JSON Record<string, unknown>
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
});
var crmPipelineStages = sqliteTable("crm_pipeline_stages", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  order: integer("order").notNull(),
  color: text("color"),
  isDefault: integer("is_default", { mode: "boolean" }).notNull().default(false),
  isClosed: integer("is_closed", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull()
});
var crmDeals = sqliteTable("crm_deals", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  contactId: text("contact_id").notNull(),
  stageId: text("stage_id").notNull(),
  value: integer("value"),
  // in cents
  currency: text("currency").notNull().default("USD"),
  expectedCloseDate: integer("expected_close_date", { mode: "timestamp" }),
  closedAt: integer("closed_at", { mode: "timestamp" }),
  ownerId: text("owner_id"),
  tags: text("tags"),
  // JSON string[]
  notes: text("notes"),
  status: text("status", { enum: ["open", "won", "lost"] }).notNull().default("open"),
  customFields: text("custom_fields"),
  // JSON Record<string, unknown>
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
});
var crmActivities = sqliteTable("crm_activities", {
  id: text("id").primaryKey(),
  type: text("type", { enum: ["call", "email", "email_received", "meeting", "note", "task", "form_submission", "pipeline_change", "status_change", "deal_created", "website_visit"] }).notNull(),
  title: text("title").notNull(),
  description: text("description"),
  contactId: text("contact_id"),
  dealId: text("deal_id"),
  userId: text("user_id"),
  assigneeId: text("assignee_id"),
  dueDate: integer("due_date", { mode: "timestamp" }),
  completedAt: integer("completed_at", { mode: "timestamp" }),
  metadata: text("metadata"),
  // JSON Record<string, unknown>
  createdAt: integer("created_at", { mode: "timestamp" }).notNull()
});
var crmDealStageHistory = sqliteTable("crm_deal_stage_history", {
  id: text("id").primaryKey(),
  dealId: text("deal_id").notNull(),
  fromStageId: text("from_stage_id"),
  toStageId: text("to_stage_id").notNull(),
  changedBy: text("changed_by"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull()
});
var crmPipelines = sqliteTable("crm_pipelines", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  inputSources: text("input_sources").notNull().default("[]"),
  // JSON PipelineInputSource[]
  steps: text("steps").notNull().default("[]"),
  // JSON PipelineStep[] (legacy, kept for migration)
  nodes: text("nodes").notNull().default("[]"),
  // JSON PipelineNode[]
  edges: text("edges").notNull().default("[]"),
  // JSON PipelineEdge[]
  apiKeys: text("api_keys").notNull().default("[]"),
  // JSON PipelineApiKey[]
  status: text("status", { enum: ["active", "archived"] }).notNull().default("active"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
});
var crmPipelineEntries = sqliteTable("crm_pipeline_entries", {
  id: text("id").primaryKey(),
  pipelineId: text("pipeline_id").notNull(),
  contactId: text("contact_id").notNull(),
  contactName: text("contact_name").notNull(),
  contactEmail: text("contact_email"),
  contactCompany: text("contact_company"),
  currentStepIndex: integer("current_step_index").notNull().default(0),
  // legacy, kept for migration
  currentNodeId: text("current_node_id"),
  stepStatuses: text("step_statuses").notNull().default("[]"),
  // JSON PipelineEntryStep[] (legacy)
  nodeStatuses: text("node_statuses").notNull().default("[]"),
  // JSON PipelineEntryNode[]
  status: text("status", { enum: ["active", "completed", "dropped"] }).notNull().default("active"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
});
var schemaVersion = sqliteTable("_schema_version", {
  id: text("id").primaryKey().default("version"),
  version: integer("version").notNull(),
  migratedAt: integer("migrated_at", { mode: "timestamp" }).notNull()
});
var auditLogs = sqliteTable("audit_logs", {
  id: text("id").primaryKey(),
  actorType: text("actor_type", { enum: ["user", "worker", "sdk", "system"] }).notNull(),
  actorId: text("actor_id"),
  actorEmail: text("actor_email"),
  action: text("action").notNull(),
  resourceType: text("resource_type").notNull(),
  resourceId: text("resource_id"),
  traceId: text("trace_id"),
  metadata: text("metadata"),
  // JSON Record<string, unknown>
  createdAt: integer("created_at", { mode: "timestamp" }).notNull()
});

// ../types/src/index.ts
var SDK_VERSION = "0.1.16";

// src/provider.tsx
import { jsx } from "react/jsx-runtime";
var GrowthEngineContext = createContext({});
function matchesPattern(version2, pattern) {
  const regex = new RegExp("^" + pattern.replace(/\./g, "\\.").replace(/x/g, "\\d+") + "$");
  return regex.test(version2);
}
function GrowthEngineProvider({
  children,
  locale,
  tenantSlug
}) {
  useEffect(() => {
    let cancelled = false;
    async function checkVersion() {
      const res = await sdkFetch("/sdk-status");
      if (cancelled || res.error) return;
      const manifest = res.data;
      if (!manifest || "disabled" in manifest && manifest.disabled) return;
      const isDeprecated = manifest.deprecated?.some((p) => matchesPattern(SDK_VERSION, p));
      const isUnsupported = manifest.unsupported?.some((p) => matchesPattern(SDK_VERSION, p));
      if (isUnsupported) {
        console.error(
          `[GrowthEngine] SDK version ${SDK_VERSION} is unsupported. Please upgrade to ${manifest.latest}.`
        );
      } else if (isDeprecated) {
        console.warn(
          `[GrowthEngine] SDK version ${SDK_VERSION} is deprecated. Please upgrade to ${manifest.latest}.`
        );
      }
    }
    void checkVersion();
    return () => {
      cancelled = true;
    };
  }, []);
  return /* @__PURE__ */ jsx(GrowthEngineContext.Provider, { value: { locale, tenantSlug }, children });
}
function useGrowthEngine() {
  return useContext(GrowthEngineContext);
}

// src/hooks/useContent.ts
import { useState, useEffect as useEffect2 } from "react";
function useContent(type, options) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const locale = options?.locale;
  useEffect2(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const params = new URLSearchParams({ type });
      if (locale) params.set("locale", locale);
      const res = await sdkFetch(`/content?${params.toString()}`);
      if (cancelled) return;
      if (res.error) {
        setError(res.error);
      } else {
        setPosts(res.data);
      }
      setLoading(false);
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [type, locale]);
  return { posts, loading, error };
}
async function fetchBlog(slugOrUrlPath, locale) {
  const params = new URLSearchParams({ type: "blog", slug: slugOrUrlPath });
  if (locale) params.set("locale", locale);
  const res = await sdkFetch(`/content?${params.toString()}`);
  return res.error ? null : res.data;
}
function getBlogUrl(post) {
  const path = post.urlPath ?? post.slug;
  return `/blog/${path}`;
}
async function getSocialPosts(platform) {
  const res = await sdkFetch(
    `/content?type=social&platform=${encodeURIComponent(platform)}`
  );
  return res.error ? [] : res.data;
}

// src/hooks/useAuthors.ts
import { useState as useState2, useEffect as useEffect3 } from "react";
function useAuthors() {
  const [authors, setAuthors] = useState2([]);
  const [loading, setLoading] = useState2(true);
  const [error, setError] = useState2(null);
  useEffect3(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const res = await sdkFetch("/content?type=blog-authors");
      if (cancelled) return;
      if (res.error) {
        setError(res.error);
      } else {
        setAuthors(res.data);
      }
      setLoading(false);
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);
  return { authors, loading, error };
}
async function fetchAuthor(slug) {
  const params = new URLSearchParams({ type: "blog-authors", slug });
  const res = await sdkFetch(`/content?${params.toString()}`);
  return res.error ? null : res.data;
}
async function fetchAuthorPosts(authorSlug, options) {
  const params = new URLSearchParams({ type: "blog", authorSlug });
  if (options?.locale) params.set("locale", options.locale);
  if (options?.limit !== void 0) params.set("limit", String(options.limit));
  if (options?.offset !== void 0) params.set("offset", String(options.offset));
  const res = await sdkFetch(`/content?${params.toString()}`);
  return res.error ? [] : res.data;
}

// src/hooks/useBusinessConfig.ts
import { useState as useState3, useEffect as useEffect4 } from "react";
function useBusinessConfig() {
  const [config, setConfig] = useState3(null);
  const [loading, setLoading] = useState3(true);
  const [error, setError] = useState3(null);
  useEffect4(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const res = await sdkFetch("/config");
      if (cancelled) return;
      if (res.error) {
        setError(res.error);
      } else {
        setConfig(res.data);
      }
      setLoading(false);
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);
  return { config, loading, error };
}
async function getHours() {
  const res = await sdkFetch("/config");
  return res.error ? null : res.data.hours;
}
async function getContactInfo() {
  const res = await sdkFetch("/config");
  return res.error ? null : res.data.contact;
}

// src/hooks/useForms.ts
import { useState as useState4, useEffect as useEffect5, useMemo } from "react";

// src/lib/buildFormSchema.ts
import { z } from "zod";
function buildFormSchema(fields) {
  const shape = {};
  for (const field of fields) {
    let schema;
    switch (field.type) {
      case "email":
        schema = z.string().email();
        break;
      case "url":
        schema = z.string().url();
        break;
      case "number":
        schema = z.coerce.number();
        break;
      case "checkbox":
        schema = z.boolean();
        break;
      case "select":
        if (field.options && field.options.length > 0) {
          schema = z.enum(field.options);
        } else {
          schema = z.string();
        }
        break;
      default:
        schema = z.string();
        break;
    }
    if (field.required) {
      if (field.type === "text" || field.type === "tel" || field.type === "textarea") {
        schema = z.string().min(1);
      }
    } else {
      schema = schema.optional();
    }
    shape[field.name] = schema;
  }
  return z.object(shape);
}

// src/hooks/useForms.ts
function useForms() {
  const [forms2, setForms] = useState4([]);
  const [loading, setLoading] = useState4(true);
  const [error, setError] = useState4(null);
  useEffect5(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const res = await sdkFetch("/forms?action=list");
      if (cancelled) return;
      if (res.error) {
        setError(res.error);
      } else {
        setForms(res.data);
      }
      setLoading(false);
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);
  return { forms: forms2, loading, error };
}
function useForm(slug) {
  const [form, setForm] = useState4(null);
  const [loading, setLoading] = useState4(true);
  const [error, setError] = useState4(null);
  useEffect5(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const res = await sdkFetch(
        `/forms?action=get&slug=${encodeURIComponent(slug)}`
      );
      if (cancelled) return;
      if (res.error) {
        setError(res.error);
      } else {
        setForm(res.data);
      }
      setLoading(false);
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [slug]);
  const schema = useMemo(() => {
    if (!form?.fields) return null;
    return buildFormSchema(form.fields);
  }, [form]);
  return { form, schema, loading, error };
}
async function submitForm(slug, data) {
  const formRes = await sdkFetch(
    `/forms?action=get&slug=${encodeURIComponent(slug)}`
  );
  if (formRes.error || !formRes.data) {
    return { ok: false, error: formRes.error ?? "Form not found" };
  }
  const schema = buildFormSchema(formRes.data.fields);
  const result = schema.safeParse(data);
  if (!result.success) {
    return { ok: false, error: "Validation failed", validationErrors: result.error.issues };
  }
  const res = await sdkFetch(
    `/forms?action=submit&slug=${encodeURIComponent(slug)}`,
    {
      method: "POST",
      body: JSON.stringify({ data })
    }
  );
  if (res.error) {
    return { ok: false, error: res.error };
  }
  return res.data;
}

// src/hooks/useCrm.ts
async function pushLead(data) {
  const res = await sdkFetch("/crm?action=push-lead", {
    method: "POST",
    body: JSON.stringify(data)
  });
  return res.error ? { ok: false, error: res.error } : res.data;
}

// src/hooks/useSDKStatus.ts
import { useState as useState5, useEffect as useEffect6 } from "react";
function useSDKStatus() {
  const [manifest, setManifest] = useState5(null);
  const [loading, setLoading] = useState5(true);
  const [error, setError] = useState5(null);
  useEffect6(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const res = await sdkFetch("/sdk-status");
      if (cancelled) return;
      if (res.error) {
        setError(res.error);
      } else {
        setManifest(res.data);
      }
      setLoading(false);
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);
  return { manifest, loading, error };
}

// src/hooks/useJobStatus.ts
import { useState as useState6, useEffect as useEffect7, useCallback } from "react";
function useJobStatus(jobId) {
  const [job, setJob] = useState6(null);
  const [loading, setLoading] = useState6(false);
  const [error, setError] = useState6(null);
  const load = useCallback(async () => {
    if (!jobId) return;
    setLoading(true);
    const res = await sdkFetch(`/jobs/${encodeURIComponent(jobId)}`);
    if (res.error) {
      setError(res.error);
    } else {
      setJob(res.data);
    }
    setLoading(false);
  }, [jobId]);
  useEffect7(() => {
    void load();
  }, [load]);
  return { job, loading, error, refresh: load };
}

// src/triggers/triggerBlogGen.ts
async function triggerBlogGen(payload) {
  const res = await sdkFetch("/jobs", {
    method: "POST",
    body: JSON.stringify({ type: "blog.generate", payload })
  });
  if (res.error) {
    throw new Error(res.error);
  }
  return res.data;
}

// src/triggers/triggerSocialSync.ts
async function triggerSocialSync(platforms) {
  const res = await sdkFetch("/jobs", {
    method: "POST",
    body: JSON.stringify({ type: "social.sync", payload: { platforms } })
  });
  if (res.error) {
    throw new Error(res.error);
  }
  return res.data;
}

// src/triggers/onAnalyticsEvent.ts
async function onAnalyticsEvent(event) {
  await sdkFetch("/analytics", {
    method: "POST",
    body: JSON.stringify(event)
  });
}

// src/seo/json-ld.ts
function omitNulls(obj) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value != null) {
      result[key] = value;
    }
  }
  return result;
}
function buildBlogPostingLd(post, author, business) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    ...omitNulls({
      headline: post.seoTitle ?? post.title,
      description: post.seoDesc,
      image: post.heroImageUrl,
      datePublished: post.publishedAt ? new Date(post.publishedAt).toISOString() : null,
      dateModified: new Date(post.updatedAt).toISOString(),
      inLanguage: post.language
    })
  };
  if (author) {
    ld.author = omitNulls({
      "@type": "Person",
      name: author.name,
      url: author.websiteUrl,
      image: author.avatarUrl
    });
  }
  if (business?.name) {
    ld.publisher = omitNulls({
      "@type": "Organization",
      name: business.name,
      url: business.website
    });
  }
  return ld;
}
function buildLocalBusinessLd(config) {
  if (!config.name) return null;
  const ld = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    ...omitNulls({
      name: config.name,
      description: config.description,
      telephone: config.phone,
      email: config.email,
      url: config.website
    })
  };
  if (config.address && typeof config.address === "object") {
    ld.address = {
      "@type": "PostalAddress",
      ...config.address
    };
  }
  return ld;
}

// src/seo/MetaTags.tsx
import Head from "next/head";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function MetaTags({ title, description, image, url, type = "article" }) {
  return /* @__PURE__ */ jsxs(Head, { children: [
    title && /* @__PURE__ */ jsx2("meta", { property: "og:title", content: title }),
    description && /* @__PURE__ */ jsx2("meta", { property: "og:description", content: description }),
    image && /* @__PURE__ */ jsx2("meta", { property: "og:image", content: image }),
    url && /* @__PURE__ */ jsx2("meta", { property: "og:url", content: url }),
    /* @__PURE__ */ jsx2("meta", { property: "og:type", content: type }),
    /* @__PURE__ */ jsx2("meta", { name: "twitter:card", content: image ? "summary_large_image" : "summary" }),
    title && /* @__PURE__ */ jsx2("meta", { name: "twitter:title", content: title }),
    description && /* @__PURE__ */ jsx2("meta", { name: "twitter:description", content: description }),
    image && /* @__PURE__ */ jsx2("meta", { name: "twitter:image", content: image })
  ] });
}
export {
  GrowthEngineProvider,
  MetaTags,
  SDK_VERSION,
  buildBlogPostingLd,
  buildFormSchema,
  buildLocalBusinessLd,
  fetchAuthor,
  fetchAuthorPosts,
  fetchBlog,
  getBlogUrl,
  getContactInfo,
  getHours,
  getSocialPosts,
  onAnalyticsEvent,
  pushLead,
  sdkFetch,
  submitForm,
  triggerBlogGen,
  triggerSocialSync,
  useAuthors,
  useBusinessConfig,
  useContent,
  useForm,
  useForms,
  useGrowthEngine,
  useJobStatus,
  useSDKStatus
};
//# sourceMappingURL=index.js.map