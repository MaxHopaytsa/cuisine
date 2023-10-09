interface IApollo {
  initApolloRoute(): void;
  start(): Promise<void>;
}

export { type IApollo };
