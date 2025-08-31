import { GraphQLResolveInfo } from 'graphql';
import { MyContext } from '../context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AbilityScores = {
  __typename?: 'AbilityScores';
  charisma: Scalars['Int']['output'];
  constitution: Scalars['Int']['output'];
  dexterity: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  intelligence: Scalars['Int']['output'];
  strength: Scalars['Int']['output'];
  wisdom: Scalars['Int']['output'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type Character = {
  __typename?: 'Character';
  abilityScoresId?: Maybe<Scalars['Int']['output']>;
  armor?: Maybe<Scalars['Int']['output']>;
  class: Scalars['String']['output'];
  currentHealth: Scalars['Int']['output'];
  healthDice: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  level: Scalars['Int']['output'];
  maxHealth: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  proficiencies: Array<Scalars['String']['output']>;
  race: Scalars['String']['output'];
  savingThrows: Array<Scalars['String']['output']>;
  speed?: Maybe<Scalars['Int']['output']>;
  subclass: Scalars['String']['output'];
  subrace: Scalars['String']['output'];
  tempHealth: Scalars['Int']['output'];
};

export type CreateAbilityScoresInput = {
  charisma: Scalars['Int']['input'];
  constitution: Scalars['Int']['input'];
  dexterity: Scalars['Int']['input'];
  intelligence: Scalars['Int']['input'];
  strength: Scalars['Int']['input'];
  wisdom: Scalars['Int']['input'];
};

export type CreateCharacterInput = {
  abilityScoresId: Scalars['Int']['input'];
  armor: Scalars['Int']['input'];
  class: Scalars['String']['input'];
  currentHealth: Scalars['Int']['input'];
  healthDice: Scalars['String']['input'];
  level: Scalars['Int']['input'];
  maxHealth: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  proficiencies: Array<Scalars['String']['input']>;
  race: Scalars['String']['input'];
  savingThrows: Array<Scalars['String']['input']>;
  speed: Scalars['Int']['input'];
  subclass: Scalars['String']['input'];
  subrace: Scalars['String']['input'];
  tempHealth: Scalars['Int']['input'];
};

export type CreateFeatureInput = {
  characterId: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  level: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type CreateSpellInput = {
  casting: Scalars['String']['input'];
  characterId: Scalars['Int']['input'];
  components: Scalars['String']['input'];
  description: Scalars['String']['input'];
  duration: Scalars['String']['input'];
  level: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  range: Scalars['String']['input'];
  school: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Feature = {
  __typename?: 'Feature';
  characterId: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  level: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type LoginInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAbilityScores: AbilityScores;
  createCharacter?: Maybe<Character>;
  createFeature: Feature;
  createSpell: Spell;
  deleteFeature?: Maybe<Feature>;
  deleteSpell?: Maybe<Spell>;
  login: AuthPayload;
  registerUser: User;
  updateAbilityScores: AbilityScores;
  updateCharacter?: Maybe<Character>;
  updateHealth?: Maybe<Character>;
};


export type MutationCreateAbilityScoresArgs = {
  input: CreateAbilityScoresInput;
};


export type MutationCreateCharacterArgs = {
  input: CreateCharacterInput;
};


export type MutationCreateFeatureArgs = {
  input: CreateFeatureInput;
};


export type MutationCreateSpellArgs = {
  input: CreateSpellInput;
};


export type MutationDeleteFeatureArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteSpellArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterUserArgs = {
  input: CreateUserInput;
};


export type MutationUpdateAbilityScoresArgs = {
  id: Scalars['ID']['input'];
  input: CreateAbilityScoresInput;
};


export type MutationUpdateCharacterArgs = {
  id: Scalars['ID']['input'];
  input: UpdateCharacterInput;
};


export type MutationUpdateHealthArgs = {
  id: Scalars['ID']['input'];
  input: UpdateHealthInput;
};

export type Query = {
  __typename?: 'Query';
  abilityScores: AbilityScores;
  character: Character;
  characters?: Maybe<Array<Maybe<Character>>>;
  features?: Maybe<Array<Maybe<Feature>>>;
  spells?: Maybe<Array<Maybe<Spell>>>;
};


export type QueryAbilityScoresArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCharacterArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFeaturesArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySpellsArgs = {
  id: Scalars['ID']['input'];
};

export type Spell = {
  __typename?: 'Spell';
  casting: Scalars['String']['output'];
  characterId: Scalars['Int']['output'];
  components: Scalars['String']['output'];
  description: Scalars['String']['output'];
  duration: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  level: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  range: Scalars['String']['output'];
  school: Scalars['String']['output'];
};

export type UpdateCharacterInput = {
  armor: Scalars['Int']['input'];
  class: Scalars['String']['input'];
  currentHealth: Scalars['Int']['input'];
  healthDice: Scalars['String']['input'];
  level: Scalars['Int']['input'];
  maxHealth: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  proficiencies: Array<Scalars['String']['input']>;
  race: Scalars['String']['input'];
  savingThrows: Array<Scalars['String']['input']>;
  speed: Scalars['Int']['input'];
  subclass: Scalars['String']['input'];
  subrace: Scalars['String']['input'];
  tempHealth: Scalars['Int']['input'];
};

export type UpdateHealthInput = {
  currentHealth: Scalars['Int']['input'];
  tempHealth: Scalars['Int']['input'];
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  password: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AbilityScores: ResolverTypeWrapper<AbilityScores>;
  AuthPayload: ResolverTypeWrapper<AuthPayload>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Character: ResolverTypeWrapper<Character>;
  CreateAbilityScoresInput: CreateAbilityScoresInput;
  CreateCharacterInput: CreateCharacterInput;
  CreateFeatureInput: CreateFeatureInput;
  CreateSpellInput: CreateSpellInput;
  CreateUserInput: CreateUserInput;
  Feature: ResolverTypeWrapper<Feature>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  LoginInput: LoginInput;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Spell: ResolverTypeWrapper<Spell>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateCharacterInput: UpdateCharacterInput;
  UpdateHealthInput: UpdateHealthInput;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AbilityScores: AbilityScores;
  AuthPayload: AuthPayload;
  Boolean: Scalars['Boolean']['output'];
  Character: Character;
  CreateAbilityScoresInput: CreateAbilityScoresInput;
  CreateCharacterInput: CreateCharacterInput;
  CreateFeatureInput: CreateFeatureInput;
  CreateSpellInput: CreateSpellInput;
  CreateUserInput: CreateUserInput;
  Feature: Feature;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  LoginInput: LoginInput;
  Mutation: {};
  Query: {};
  Spell: Spell;
  String: Scalars['String']['output'];
  UpdateCharacterInput: UpdateCharacterInput;
  UpdateHealthInput: UpdateHealthInput;
  User: User;
};

export type AbilityScoresResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['AbilityScores'] = ResolversParentTypes['AbilityScores']> = {
  charisma?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  constitution?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  dexterity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  intelligence?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  strength?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  wisdom?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthPayloadResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CharacterResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Character'] = ResolversParentTypes['Character']> = {
  abilityScoresId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  armor?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  class?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  currentHealth?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  healthDice?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  level?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  maxHealth?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  proficiencies?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  race?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  savingThrows?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  speed?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  subclass?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subrace?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tempHealth?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeatureResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Feature'] = ResolversParentTypes['Feature']> = {
  characterId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  level?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createAbilityScores?: Resolver<ResolversTypes['AbilityScores'], ParentType, ContextType, RequireFields<MutationCreateAbilityScoresArgs, 'input'>>;
  createCharacter?: Resolver<Maybe<ResolversTypes['Character']>, ParentType, ContextType, RequireFields<MutationCreateCharacterArgs, 'input'>>;
  createFeature?: Resolver<ResolversTypes['Feature'], ParentType, ContextType, RequireFields<MutationCreateFeatureArgs, 'input'>>;
  createSpell?: Resolver<ResolversTypes['Spell'], ParentType, ContextType, RequireFields<MutationCreateSpellArgs, 'input'>>;
  deleteFeature?: Resolver<Maybe<ResolversTypes['Feature']>, ParentType, ContextType, RequireFields<MutationDeleteFeatureArgs, 'id'>>;
  deleteSpell?: Resolver<Maybe<ResolversTypes['Spell']>, ParentType, ContextType, RequireFields<MutationDeleteSpellArgs, 'id'>>;
  login?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
  registerUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationRegisterUserArgs, 'input'>>;
  updateAbilityScores?: Resolver<ResolversTypes['AbilityScores'], ParentType, ContextType, RequireFields<MutationUpdateAbilityScoresArgs, 'id' | 'input'>>;
  updateCharacter?: Resolver<Maybe<ResolversTypes['Character']>, ParentType, ContextType, RequireFields<MutationUpdateCharacterArgs, 'id' | 'input'>>;
  updateHealth?: Resolver<Maybe<ResolversTypes['Character']>, ParentType, ContextType, RequireFields<MutationUpdateHealthArgs, 'id' | 'input'>>;
};

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  abilityScores?: Resolver<ResolversTypes['AbilityScores'], ParentType, ContextType, RequireFields<QueryAbilityScoresArgs, 'id'>>;
  character?: Resolver<ResolversTypes['Character'], ParentType, ContextType, RequireFields<QueryCharacterArgs, 'id'>>;
  characters?: Resolver<Maybe<Array<Maybe<ResolversTypes['Character']>>>, ParentType, ContextType>;
  features?: Resolver<Maybe<Array<Maybe<ResolversTypes['Feature']>>>, ParentType, ContextType, RequireFields<QueryFeaturesArgs, 'id'>>;
  spells?: Resolver<Maybe<Array<Maybe<ResolversTypes['Spell']>>>, ParentType, ContextType, RequireFields<QuerySpellsArgs, 'id'>>;
};

export type SpellResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Spell'] = ResolversParentTypes['Spell']> = {
  casting?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  characterId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  components?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  duration?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  level?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  range?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  school?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = MyContext> = {
  AbilityScores?: AbilityScoresResolvers<ContextType>;
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  Character?: CharacterResolvers<ContextType>;
  Feature?: FeatureResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Spell?: SpellResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

