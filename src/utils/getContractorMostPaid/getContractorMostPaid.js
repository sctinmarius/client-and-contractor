const getContractorMostPaid = (data) => {
  const arrayTotalJobsPaid = data.reduce((acc, item) => {
    const objFind = acc.find((i) => i.ContractorId === item.ContractorId);

    if (objFind) {
      objFind.total += item["Jobs.price"];
    } else {
      return [...acc, { ContractorId: item.ContractorId, total: item["Jobs.price"] }];
    }

    return acc;
  }, []);

  return arrayTotalJobsPaid.reduce(
    (prev, current) => (prev.total > current.total ? prev : current),
    0
  );
};

module.exports = { getContractorMostPaid };
