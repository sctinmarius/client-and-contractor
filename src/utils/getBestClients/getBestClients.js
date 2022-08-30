const getBestClients = (data = [], limit = 2) => {
  const arrSumPaidJobs = data.reduce((acc, item) => {
    const objFind = acc.find((i) => i.id === item.id);
    if (objFind) {
      objFind.paid += item.paid;
    } else {
      return [...acc, { ...item }];
    }
    return acc;
  }, []);

  const sorted = [...arrSumPaidJobs].sort((a, b) => b.paid - a.paid);
  const sliced = sorted.slice(0, limit);
  return sliced;
};

module.exports = { getBestClients };
