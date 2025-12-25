export const fetcher = async <T>(resource: RequestInfo, init?: RequestInit): Promise<T> => {
  const res = await fetch(resource, init);
  if (!res.ok) {
    const errorRes = await res.json();
    const error = new Error(errorRes.message ?? 'APIリクエスト中にエラーが発生しました');
    throw error;
  }
  return res.json() as Promise<T>;
};
